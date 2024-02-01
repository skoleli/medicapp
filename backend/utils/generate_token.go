package utils

import (
	"strconv"
	"time"

	"github.com/BarisKilicGsu/drugs-app-backend/common"
	"github.com/golang-jwt/jwt"
)

func GeneretAccesToken(id string) (string, error) {
	secretKey := common.GetEnvironment().JwtSecret
	ttl := common.GetEnvironment().TokenTTL
	ttlInt, _ := strconv.ParseUint(ttl, 10, 64)
	claim := jwt.MapClaims{
		"user_id": id,
		"exp":     time.Now().Add(time.Duration(ttlInt) * time.Minute).Unix(),
	}
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	token, err := at.SignedString([]byte(secretKey))
	return token, err
}

func TokenValid(accessToken string) (*jwt.Token, error) {
	token, err := jwt.ParseWithClaims(accessToken, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		secretKey := common.GetEnvironment().JwtSecret
		return []byte(secretKey), nil
	})
	return token, err
}
