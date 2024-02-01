package entities

import "time"

type Drug struct {
	ID             uint64       `gorm:"primary_key"`
	DrugCategoryID uint64       `gorm:"column:drug_category_id"`
	DrugCategory   DrugCategory `gorm:"foreignKey:DrugCategoryID"`
	Name           string       `gorm:"not null"`
	Description    string       `gorm:"column:description"`
	SideEffects    string       `gorm:"column:side_effects"`
	Warnings       string       `gorm:"column:warnings"`
	ImageURL       string       `gorm:"column:image_url"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}
