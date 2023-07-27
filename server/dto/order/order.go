package orderdto

import "dumbmerch/models"

type OrderRequest struct {
	ProductID int   `json:"product_id" form:"product_id" gorm:"type: int"`
	TopingID  []int `json:"toping_id" form:"toping_id" gorm:"type: int"`
	Qty       int   `json:"qty" form:"qty" gorm:"type: int"`
	SubAmount int   `json:"sub_amount" form:"sub_amount" gorm:"type: int"`
	UserID    int   `json:"user_id" form:"user_id" gorm:"type: int"`
}

type OrderResponse struct {
	ID          int                        `json:"id"`
	Product     models.ProductResponse     `json:"product"`
	Toping      []models.Toping            `json:"toping"`
	UserOrder   models.UsersResponse       `json:"userOrder"`
	Transaction models.TransactionResponse `json:"transaction"`
	Qty         int                        `json:"qty"`
	SubAmount   int                        `json:"sub_amount"`
}

type UpdateOrder struct {
	Qty int `json:"qty" form:"qty"`
}

type UpdateOrderTransaction struct {
	TransactionID int    `json:"transaction_id"`
	Status        string `json:"status"`
}
type DeleteOrder struct {
	ID int `json:"id"`
}
