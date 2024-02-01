package entities

import (
	"time"

	"github.com/BarisKilicGsu/drugs-app-backend/models"
)

type User struct {
	ID        uint64 `gorm:"primaryKey"`
	Name      string `gorm:"column:name"`
	Email     string `gorm:"column:email;unique"`
	Password  string `gorm:"column:password"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (u *User) CreateFromSignupRequest(request *models.SignupRequest, hashedPassword string) {
	u.Email = request.Email.String()
	u.Name = *request.Name
	u.Password = hashedPassword
}
