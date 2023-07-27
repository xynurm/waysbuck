package models

import "time"

type Transaction struct {
	ID        int           `json:"id" gorm:"primary_key:auto_increment"`
	Order     []Order       `json:"order" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User      UsersResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UserID    int           `json:"user_id"`
	Status    string        `json:"status" gorm:"type: varchar(25)"`
	Amount    int           `json:"amount"`
	CreatedAt time.Time     `json:"-"`
	UpdatedAt time.Time     `json:"-"`
}

type TransactionResponse struct {
	ID     int           `json:"id"`
	User   UsersResponse `json:"user"`
	UserID int           `json:"user_id"`
	Status string        `json:"status"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
