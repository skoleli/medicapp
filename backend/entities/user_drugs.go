package entities

import "time"

type UserDrug struct {
	ID              uint64     `gorm:"column:id;primary_key;AUTO_INCREMENT"`
	UserID          uint64     `gorm:"column:user_id"`
	DrugID          uint64     `gorm:"column:drug_id"`
	Drug            Drug       `gorm:"foreignKey:DrugID"`
	IsFasting       bool       `gorm:"column:is_fasting"`
	DosageFrequency uint64     `gorm:"column:dosage_frequency"`
	Status          string     `gorm:"column:status;default:ACTIVE"`
	StartDate       time.Time  `gorm:"column:start_date"`
	EndDate         *time.Time `gorm:"column:end_date"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
}
