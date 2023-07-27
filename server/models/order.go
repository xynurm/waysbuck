package models

import "time"

type Order struct {
	ID            int                 `json:"id" gorm:"primary_key:auto_increment"`
	ProductID     int                 `json:"product_id"`
	Product       ProductResponse     `json:"product" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Toping        []Toping            `json:"toping" gorm:"many2many:order_topings;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User          UsersResponse       `json:"user"`
	Status        string              `json:"status" gorm:"type: varchar(15)"`
	UserID        int                 `json:"user_id" gorm:"type: int"`
	TransactionId *int                `json:"transaction_id" gorm:"type: int"`
	Transaction   TransactionResponse `json:"-" `
	Qty           int                 `json:"qty"  gorm:"type: int"`
	SubAmount     int                 `json:"sub_amount" gorm:"type: int"`
	CreatedAt     time.Time           `json:"-"`
	UpdatedAt     time.Time           `json:"-"`
}

type OrderResponse struct {
	ID        int   `json:"id"`
	Qty       int   `json:"qty"`
	Price     int   `json:"price"`
	ProductID int   `json:"product_id"`
	TopingID  []int `json:"toping_id"`
	UserID    int   `json:"user_id"`
	SubAmount int   `json:"-" `
}

type OrderTransactionsResponse struct {
	ID        int             `json:"id" gorm:"primary_key:auto_increment"`
	ProductID int             `json:"-"`
	Product   ProductResponse `json:"product" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Toping    []Toping        `json:"toping" gorm:"many2many:order_topings;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UserID    int             `json:"-"`
	User      UsersResponse   `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Qty       int             `json:"qty"  gorm:"type: int"`
	SubAmount int             `json:"sub_amount" gorm:"type: int"`
}

func (OrderResponse) TableName() string {
	return "orders"
}

func (OrderTransactionsResponse) TableName() string {
	return "orders"
}
