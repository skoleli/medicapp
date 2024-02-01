package common

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Environment struct {
	ApplicationHost string
	ApplicationPort string
	Debug           bool
	BasePrefix      string
	DatabaseUrl     string
	RedisAddress    string
	RedisSentinels  string
	RedisPassword   string
	RedisMasterName string
	KafkaHost       string
	KafkaTopic      string
	JwtSecret       string
	TokenTTL        string
	SessionTTL      string
	ApiTimeout      string
}

// ParseEnv Get environment value from os
// If an environment required and not set raises a panic
func ParseEnv(key string, required bool, dft string) string {
	_ = godotenv.Load()
	value := os.Getenv(key)
	if value == "" && required {
		panic(fmt.Sprintf("Environment variable not found: %v", key))
	} else if value == "" {
		return dft
	}
	return value
}

func GetEnvironment() *Environment {
	return &Environment{
		ApplicationHost: ParseEnv("APPLICATION_HOST", false, "0.0.0.0"),
		ApplicationPort: ParseEnv("APPLICATION_PORT", false, "8010"),
		Debug:           ParseEnv("DEBUG", false, "false") == "true",
		BasePrefix:      ParseEnv("BASE_PREFIX", false, "/"),
		DatabaseUrl:     ParseEnv("DATABASE_URL", true, "host=localhost user=postgres password=postgres dbname=drugs-app port=5432 sslmode=disable"),
		RedisAddress:    ParseEnv("REDIS_ADDRESS", false, "127.0.0.1:6379"),
		RedisSentinels:  ParseEnv("REDIS_SENTINELS", false, ""),
		RedisPassword:   ParseEnv("REDIS_PASSWORD", false, ""),
		RedisMasterName: ParseEnv("REDIS_MASTER_NAME", false, ""),
		KafkaHost:       ParseEnv("KAFKA_HOST", false, "kafka:9092"),
		JwtSecret:       ParseEnv("JWT_SECRET", false, "test_secret"),
		KafkaTopic:      ParseEnv("KAFKA_TOPIC", false, "drugs"),
		SessionTTL:      ParseEnv("SESSION_TTL", false, "60"),
		TokenTTL:        ParseEnv("TOKEN_TTL", false, "1440"),
		ApiTimeout:      ParseEnv("API_TIMEOUT", false, "20000"),
	}
}
