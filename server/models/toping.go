package models

import "time"

type Toping struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	Name      string    `json:"title" form:"title" gorm:"type: varchar(255)"`
	Price     int       `json:"price" form:"price" gorm:"type: int"`
	Image     string    `json:"image" form:"image" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type TopingResponse struct {
	ID    int    `json:"id" gorm:"primary_key:auto_increment"`
	Name  string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
}

func (TopingResponse) TableName() string {
	return "topings"
}
