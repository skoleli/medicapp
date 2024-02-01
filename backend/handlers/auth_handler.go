package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/BarisKilicGsu/drugs-app-backend/common"
	"github.com/BarisKilicGsu/drugs-app-backend/entities"
	"github.com/BarisKilicGsu/drugs-app-backend/models"
	"github.com/BarisKilicGsu/drugs-app-backend/pkg"
	"github.com/BarisKilicGsu/drugs-app-backend/repositories"
	"github.com/BarisKilicGsu/drugs-app-backend/utils"
	"github.com/golang-jwt/jwt"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthHandler struct {
	TokenTTL   time.Duration
	SessionTTL time.Duration
	gormRepo   repositories.GormRepositoryInterface
	redisRepo  repositories.RedisClientInterface
}

func NewAuthHandler(gormRepo repositories.GormRepositoryInterface,
	redisRepo repositories.RedisClientInterface) *AuthHandler {
	sessionTTLInt, _ := strconv.Atoi(common.GetEnvironment().SessionTTL)
	tokenTTLInt, _ := strconv.Atoi(common.GetEnvironment().TokenTTL)
	sessionTTL := time.Duration(sessionTTLInt) * time.Minute
	tokenTTL := time.Duration(tokenTTLInt) * time.Minute
	return &AuthHandler{
		gormRepo:   gormRepo,
		redisRepo:  redisRepo,
		SessionTTL: sessionTTL,
		TokenTTL:   tokenTTL}
}

func (handler *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {

	utils.LogHTTPRequest(r, "Login")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	loginRequest := &models.LoginRequest{}
	err := utils.GenerateModelFromBody(loginRequest, w, r)
	if err != nil {
		return
	}

	user := entities.User{}
	p := repositories.Parameters{
		Entity:    &user,
		Condition: "email = ?",
	}

	err = handler.gormRepo.FindFirst(&p, loginRequest.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			zap.L().Error("Failed login because user could not found", zap.Error(err))
			utils.ReturnHTTPError(w, utils.NotFoundError("User"))
		} else {
			zap.L().Error("Failed login because user could not be fetch from repo", zap.Error(err))
			utils.ReturnHTTPError(w, utils.InternalServerError(err))
		}
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password.String())); err != nil {
		zap.L().Error("Failed login because password not correct", zap.Error(err))
		utils.ReturnHTTPError(w, utils.BadRequestError("Password"))
		return
	}

	id := strconv.FormatUint(user.ID, 10)
	userIDString := strconv.Itoa(int(user.ID))
	userIDWithPrefix := pkg.UserIDAuthCachePrefix + userIDString

	userSessions, err := handler.redisRepo.Get(userIDWithPrefix)
	if err != nil {
		zap.L().Error("Failed login because token could not be genereted1", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}
	var tokenList []string

	if userSessions != nil {
		err = json.Unmarshal([]byte(*userSessions), &tokenList)
		if err != nil {
			zap.L().Error("Failed login because token could not be genereted2", zap.Error(err))
			utils.ReturnHTTPError(w, utils.InternalServerError(err))
			return
		}

		if len(tokenList) == 3 {
			removedTokenList, removedToken := RemoveSession(tokenList, 0)
			tokenList = removedTokenList

			err := handler.redisRepo.Delete(removedToken)
			if err != nil {
				zap.L().Error("Failed login because token could not be genereted3", zap.Error(err))
				utils.ReturnHTTPError(w, utils.InternalServerError(err))
				return
			}
		}
	}

	token, err := utils.GeneretAccesToken(id)

	if err != nil {
		zap.L().Error("Failed login because token could not be genereted2", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	tokenList = append(tokenList, token)

	redisUserIdValue, err := json.Marshal(tokenList)
	if err != nil {
		zap.L().Error("Failed login because token could not be genereted3", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	err = handler.redisRepo.Set(userIDWithPrefix, string(redisUserIdValue), handler.SessionTTL)
	if err != nil {
		zap.L().Error("Failed login because token could not be genereted4", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	tokenWithPrefix := pkg.AuthCachePrefix + token
	err = handler.redisRepo.Set(tokenWithPrefix, userIDString, handler.TokenTTL)

	if err != nil {
		zap.L().Error("Failed login because token could not be set to redis", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	response := &models.LoginResponse{
		Token:  token,
		UserID: user.ID,
		Name:   user.Name,
		Email:  user.Email,
	}

	zap.L().Info("User logged in successfully")
	utils.ReturnHTTPOKWithInterface(w, response)

}

func (handler *AuthHandler) Signup(w http.ResponseWriter, r *http.Request) {
	utils.LogHTTPRequest(r, "Signup")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	signupRequest := &models.SignupRequest{}
	err := utils.GenerateModelFromBody(signupRequest, w, r)
	if err != nil {
		return
	}

	if signupRequest.Password.String() != signupRequest.PasswordConfirm.String() {
		zap.L().Error("Failed signup because password and password confirm do not match")
		utils.ReturnHTTPError(w, utils.BadRequestError("password and password confirm do not match"))
		return
	}

	user := entities.User{}
	p := repositories.Parameters{
		Entity:    &user,
		Condition: "email = ?",
	}

	err = handler.gormRepo.FindFirst(&p, signupRequest.Email)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		zap.L().Error("Failed signup because user could not be fetch with email from repo", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	if err == nil {
		zap.L().Error("Failed signup because this email already exists")
		utils.ReturnHTTPError(w, utils.BadRequestError("This email already exists"))
		return
	}

	tx, err := handler.gormRepo.StartTransaction()
	if err != nil {
		zap.L().Error("Failed signup because transaction could not be started", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	hashedPassword, _ := utils.HashPassword(signupRequest.Password.String())
	addUser := &entities.User{}
	addUser.CreateFromSignupRequest(signupRequest, hashedPassword)

	err = handler.gormRepo.Insert(addUser, tx)
	if err != nil {
		zap.L().Error("Failed signup because user could not be created", zap.Error(err))
		handler.gormRepo.RollbackTransaction(tx)
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	user = entities.User{}
	p = repositories.Parameters{
		Entity:      &user,
		Condition:   "email = ?",
		Transaction: tx,
	}

	err = handler.gormRepo.FindFirst(&p, signupRequest.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			zap.L().Error("Failed signup because user could not found", zap.Error(err))
			utils.ReturnHTTPError(w, utils.NotFoundError("User"))
		} else {
			zap.L().Error("Failed signup because user could not be fetch from repo", zap.Error(err))
			utils.ReturnHTTPError(w, utils.InternalServerError(err))
		}
		handler.gormRepo.RollbackTransaction(tx)
		return
	}

	id := strconv.FormatUint(user.ID, 10)

	token, err := utils.GeneretAccesToken(id)

	if err != nil {
		zap.L().Error("Failed signup because token could not be genereted", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		handler.gormRepo.RollbackTransaction(tx)
		return
	}

	err = handler.redisRepo.Set(id, token, handler.TokenTTL)
	if err != nil {
		zap.L().Error("Failed signup because token could not be set to redis", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		handler.gormRepo.RollbackTransaction(tx)
		return
	}

	err = handler.gormRepo.FinishTransaction(tx, err)
	if err != nil {
		zap.L().Error("Failed to signup because transaction could not be commited", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	response := &models.LoginResponse{
		Token:  token,
		UserID: user.ID,
		Name:   user.Name,
		Email:  user.Email,
	}

	zap.L().Info("User signup in successfully")
	utils.ReturnHTTPOKWithInterface(w, response)
}

func (handler *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	utils.LogHTTPRequest(r, "Logout")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
	if len(authHeader) != 2 {
		zap.L().Error("Failed logout because toke could not be found")
		utils.ReturnHTTPError(w, utils.BadRequestError("Token is missing in Authorization"))
		return
	}
	incomingToken := authHeader[1]
	token, err := utils.TokenValid(incomingToken)
	fmt.Println("gelen: ", incomingToken)
	if err != nil {
		zap.L().Error("Failed logout because toke could not be validate", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	claims := token.Claims.(jwt.MapClaims)
	id := claims["user_id"].(string)
	err = handler.redisRepo.Delete(id)

	if err != nil {
		zap.L().Error("Failed logout because toke could not be validate", zap.Error(err))
		utils.ReturnHTTPError(w, utils.InternalServerError(err))
		return
	}

	utils.ReturnHTTPOK(w)

}

func RemoveSession(tokenList []string, index int) ([]string, string) {
	removedToken := tokenList[index]
	tokenList = append(tokenList[:index], tokenList[index+1:]...)
	return tokenList, removedToken
}
