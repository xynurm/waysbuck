package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	FindOrdersByUser(ID int) ([]models.Order, error)
	FindAllOrder() ([]models.Order, error)
	GetProductOrder(ID int) (models.Product, error)
	FindTopingsById(TopingID []int) ([]models.Toping, error)
	GetOrder(ID int) (models.Order, error)
	GetTransactionUser(ID int) (models.Transaction, error)
	GetTransactionID(ID int) (models.Transaction, error)
	CreateTransactionOrder(transaction models.Transaction) (models.Transaction, error)
	CreateOrder(order models.Order) (models.Order, error)
	UpdateOrder(order models.Order) (models.Order, error)
	DeleteOrder(order models.Order) (models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

// func (r *repository) FindCartId(UserID int) ([]models.Cart, error) {
// 	var carts []models.Cart
// 	err := r.db.Preload("Product").Preload("Topping").Find(&carts, "user_id = ?", UserID).Error

// 	return carts, err
// }

func (r *repository) FindOrdersByUser(ID int) ([]models.Order, error) {
	var orders []models.Order
	err := r.db.Preload("Product").Preload("Toping").Preload("User").Preload("Transaction").Preload("Transaction.User").Find(&orders, "user_id = ? AND status = ?", ID, "pending").Error

	return orders, err
}

func (r *repository) FindAllOrder() ([]models.Order, error) {
	var orders []models.Order
	err := r.db.Preload("Product").Preload("Toping").Preload("User").Preload("Transaction").Preload("Transaction.User").Find(&orders).Error

	return orders, err
}

func (r *repository) GetProductOrder(ID int) (models.Product, error) {
	var product models.Product
	err := r.db.First(&product, ID).Error

	return product, err
}

func (r *repository) FindTopingsById(TopingID []int) ([]models.Toping, error) {
	var topings []models.Toping
	err := r.db.Find(&topings, TopingID).Error

	return topings, err
}

func (r *repository) GetOrder(ID int) (models.Order, error) {
	var order models.Order
	err := r.db.Preload("Product").Preload("Toping").Preload("User").Preload("Transaction").Preload("Transaction.User").First(&order, ID).Error

	return order, err
}

func (r *repository) GetTransactionID(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Find(&transaction, ID).Error
	return transaction, err
}

func (r *repository) GetTransactionUser(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Find(&transaction, "user_id = ? AND status = ?", ID, "Order").Error
	return transaction, err
}

func (r *repository) CreateTransactionOrder(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) CreateOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Transaction").Create(&order).Error

	return order, err
}

func (r *repository) UpdateOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Product").Preload("User").Preload("User").Save(&order).Error
	return order, err
}

func (r *repository) DeleteOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Product").Preload("Toping").Preload("User").Delete(&order).Error
	return order, err
}
