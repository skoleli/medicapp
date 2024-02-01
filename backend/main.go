package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/BarisKilicGsu/drugs-app-backend/common"
	"github.com/BarisKilicGsu/drugs-app-backend/handlers"
	"github.com/BarisKilicGsu/drugs-app-backend/pkg"
	"github.com/BarisKilicGsu/drugs-app-backend/repositories"
	"github.com/go-redis/redis"
	"github.com/rs/cors" // Import the cors package

	"go.uber.org/zap"
)

var (
	RedisRepository repositories.RedisClientInterface
	GormRepository  repositories.GormRepositoryInterface
)

var (
	AuthHandler           *handlers.AuthHandler
	DrugsHandler          *handlers.DrugsHandler
	UserDrugsHandler      *handlers.UserDrugsHandler
	DrugCategoriesHandler *handlers.DrugCategoriesHandler
)

func main() {

	env := common.GetEnvironment()

	// Logger
	logger := common.InitLogger(env.Debug)

	db := pkg.ConnectDB(env.DatabaseUrl)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // You might want to specify a list of allowed origins
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		// You can customize other CORS options as needed
	})

	redisClient := redis.NewClient(&redis.Options{
		Addr:     common.GetEnvironment().RedisAddress,
		Password: common.GetEnvironment().RedisPassword,
		DB:       0,
	})

	_, err := redisClient.Ping().Result()
	if err != nil {
		log.Fatalf("Redis sunucusuna bağlanırken hata oluştu: %v", err)
	}

	defer func() {
		pkg.CloseDBConnection(db)
		_ = logger.Sync()
	}()

	RedisRepository = repositories.NewRedisRepository(redisClient)
	GormRepository = repositories.NewPostgresRepository(db)

	AuthHandler = handlers.NewAuthHandler(GormRepository, RedisRepository)
	DrugsHandler = handlers.NewDrugsHandler(GormRepository)
	UserDrugsHandler = handlers.NewUserDrugsHandler(GormRepository)
	DrugCategoriesHandler = handlers.NewDrugCategoriesHandler(GormRepository)

	router := InitializeRoutes(env)
	duration, _ := strconv.Atoi(env.ApiTimeout)
	timeout := time.Duration(duration) * time.Millisecond
	timeOutHandler := http.TimeoutHandler(router, timeout, "Request Timeout!")

	handlerWithCORS := corsMiddleware.Handler(timeOutHandler)

	address := fmt.Sprintf("%v:%v", env.ApplicationHost, env.ApplicationPort)
	zap.L().Info("Retail API starting", zap.String("address", address), zap.String("BasePrefix", env.BasePrefix))
	if err := http.ListenAndServe(address, handlerWithCORS); err != nil {
		zap.L().Fatal("Failed to start Retail API server", zap.Error(err))
	}
}
