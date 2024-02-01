package repositories

import (
	"fmt"
	"log"
	"time"

	"github.com/go-redis/redis"
)

type redisRepository struct {
	redisClient *redis.Client
}

type RedisClientInterface interface {
	Set(key, value string, ttl time.Duration) error
	Get(key string) (*string, error)
	Delete(key string) error
	Ping()
}

func NewRedisRepository(redis *redis.Client) RedisClientInterface {
	return &redisRepository{redisClient: redis}
}

func (repository redisRepository) Set(key, value string, ttl time.Duration) error {
	return repository.redisClient.Set(key, value, ttl).Err()
}

func (repository redisRepository) Get(key string) (*string, error) {
	value, err := repository.redisClient.Get(key).Result()
	if err == redis.Nil {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return &value, nil
}

func (repository redisRepository) Delete(key string) error {
	return repository.redisClient.Del(key).Err()
}

func (repository redisRepository) Ping() {
	pong, err := repository.redisClient.Ping().Result()
	if err != nil {
		log.Fatal(err)
		return
	}
	fmt.Println(pong)
}
