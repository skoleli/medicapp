package entities

import "time"

type DrugCategory struct {
	ID          uint64 `gorm:"primary_key"`
	Name        string `gorm:"name"`
	Description string `gorm:"column:description"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
