package transactiondto

import (
	"dumbmerch/models"
)

type TransactionRequest struct {
	OrderID []int  `json:"order_id" form:"order_id" gorm:"type: int"`
	Status  string `json:"status" form:"status" gorm:"type: string"`
	Amount  int    `json:"amount" form:"amount" gorm:"type: int"`
	UserID  int    `json:"user_id" form:"user_id" gorm:"type: int"`
}

type TransactionResponse struct {
	ID              int                  `json:"id"`
	Order           []models.Order       `json:"order"`
	UserTransaction models.UsersResponse `json:"userTransaction"`
	Status          string               `json:"status"`
	Amount          int                  `json:"amount"`
}

type TransactionUpdateRequest struct {
	ID     int      `json:"id"`
	Order  []string `json:"order"`
	UserID int      `json:"user_id"`
	Status string   `json:"status"`
	Amount int      `json:"amount"`
}
type AmountRequest struct {
	Amount int `json:"amount"`
}
