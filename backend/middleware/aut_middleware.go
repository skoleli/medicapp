package middleware

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/BarisKilicGsu/drugs-app-backend/common"
	"github.com/BarisKilicGsu/drugs-app-backend/entities"
	"github.com/BarisKilicGsu/drugs-app-backend/pkg"
	"github.com/BarisKilicGsu/drugs-app-backend/repositories"
	"github.com/BarisKilicGsu/drugs-app-backend/utils"
	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

const (
	RequestKey string = "user_id"
)

type AuthMiddlewareHandler struct {
	SessionTTL        time.Duration
	TokenTTL          time.Duration
	RoutesWithoutAuth []string
	redisRepo         repositories.RedisClientInterface
	gormRepo          repositories.GormRepositoryInterface
}

func NewAuthMiddlewareHandler(redisRepo repositories.RedisClientInterface, gormRepo repositories.GormRepositoryInterface) AuthMiddlewareHandler {
	sessionTTLInt, _ := strconv.Atoi(common.GetEnvironment().SessionTTL)
	tokenTTLInt, _ := strconv.Atoi(common.GetEnvironment().TokenTTL)
	sessionTTL := time.Duration(sessionTTLInt) * time.Minute
	tokenTTL := time.Duration(tokenTTLInt) * time.Minute
	return AuthMiddlewareHandler{
		SessionTTL:        sessionTTL,
		TokenTTL:          tokenTTL,
		redisRepo:         redisRepo,
		gormRepo:          gormRepo,
		RoutesWithoutAuth: pkg.RoutesWithoutAuth,
	}
}

func (handler *AuthMiddlewareHandler) IsAuthorized(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		request := mux.CurrentRoute(r).GetName()
		if utils.IsContains(request, handler.RoutesWithoutAuth) {
			next.ServeHTTP(w, r)
			return
		}

		if strings.Contains(r.Header.Get("Authorization"), "Bearer") {

			authHeader := strings.TrimSpace(r.Header.Get("Authorization"))
			authParts := strings.Split(authHeader, " ")
			if len(authParts) != 2 {
				zap.L().Warn("Malformed auth header: expected 2 parts for JWT", zap.Int("parts", len(authParts)))
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			jwt := authParts[1]
			if jwt == "" {
				zap.L().Warn("Malformed auth header: JWT is empty")
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			var userIDInEndpoint *uint64

			userIDString := mux.Vars(r)["userID"]
			if userIDString != "" {
				id, err := strconv.ParseUint(userIDString, 10, 64)
				if err != nil {
					zap.L().Info("Failed to parse userID string", zap.String("user ID", userIDString), zap.Error(err))
					w.WriteHeader(http.StatusUnauthorized)
					return
				}
				userIDInEndpoint = &id
			}

			// validate jwt

			userIDInJwtStr, token, validJWT := ValidateToken(jwt)

			userIDInJwt, err := strconv.ParseUint(userIDInJwtStr, 10, 64)
			if err != nil {
				zap.L().Info("Failed to parse userID string", zap.String("user ID", userIDString), zap.Error(err))
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			if !validJWT {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			if userIDInJwt != *userIDInEndpoint {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			tokenWithPrefix := pkg.AuthCachePrefix + token
			session, err := handler.redisRepo.Get(tokenWithPrefix)
			if err != nil || session == nil {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			err = handler.redisRepo.Set(tokenWithPrefix, *session, handler.TokenTTL)
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			user := entities.User{}
			p := repositories.Parameters{
				Entity:    &user,
				Condition: "id = ?",
			}

			err = handler.gormRepo.FindFirst(&p, userIDInJwt)
			if err != nil {
				if errors.Is(err, gorm.ErrRecordNotFound) {
					zap.L().Error("Failed middleware because user could not found", zap.Error(err))
					w.WriteHeader(http.StatusUnauthorized)
				} else {
					zap.L().Error("Failed middleware because user could not be fetch from repo", zap.Error(err))
					utils.ReturnHTTPError(w, utils.InternalServerError(err))
				}
				return
			}

		} else {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func ValidateToken(jwtToken string) (string, string, bool) {

	token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(common.GetEnvironment().JwtSecret), nil
	})

	if err != nil {
		zap.L().Warn("Failed to parse JWT", zap.Error(err))
		return "", "", false
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims[string(RequestKey)].(string), jwtToken, ok && token.Valid
	}

	zap.L().Warn("JWT validation failed")
	return "", "", false
}
