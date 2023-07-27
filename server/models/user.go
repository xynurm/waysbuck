package models

import "time"

type User struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Name      string    `json:"fullName" gorm:"type: varchar(255)"`
	Email     string    `json:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"-" gorm:"type: varchar(255)"`
	Role      string    `json:"role" form:"role" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type UsersResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"fullName"`
	Email string `json:"email"`
	Role  string `json:"-"`
}

func (UsersResponse) TableName() string {
	return "users"
}
