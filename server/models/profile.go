package models

import "time"

type Profile struct {
	ID        int           `json:"id" gorm:"primary_key:auto_increment"`
	UserID    int           `json:"user_id"`
	User      UsersResponse `json:"user"`
	Phone     string        `json:"phone"  gorm:"type: varchar(15)"`
	PosCode   int           `json:"pos_code"`
	Address   string        `json:"address" form:"address" gorm:"type: varchar(255)"`
	CreatedAt time.Time     `json:"-"`
	UpdatedAt time.Time     `json:"-"`
}

type ProfileResponse struct {
	Image   string `json:"image"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
	PosCode int    `json:"pos_code"`
	UserId  string `json:"-"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
