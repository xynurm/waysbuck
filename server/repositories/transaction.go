package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	FindTransactionsUser(UserID int) ([]models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	FindOrders(ID int) ([]models.Order, error)
	FindOrdersById(OrderID []int) ([]models.Order, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetTransactionByUser(ID int) (models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetTransactionUserID(ID int) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransactionStatus(status string, ID string) error
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Order.Products").Preload("Order.Toping").Preload("Order.User").Preload("Order").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransactionByUser(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Toping").Find(&transaction, "user_id = ? AND status = ? OR status = ?  ", ID, "pending", "success").Error
	return transaction, err
}

func (r *repository) FindTransactionsUser(UserID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Toping").Find(&transactions, "user_id = ?", UserID).Error

	return transactions, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Order").Preload("Order.Product").Preload("Order.Toping").Preload("User").First(&transaction, "user_id = ? ", ID).Error

	return transaction, err
}

func (r *repository) FindOrders(ID int) ([]models.Order, error) {
	var orders []models.Order
	err := r.db.Preload("Product").Preload("Toping").Preload("User").Find(&orders, "user_id = ? AND status = ?", ID, "Order").Error

	return orders, err
}

func (r *repository) FindOrdersById(OrderID []int) ([]models.Order, error) {
	var orders []models.Order
	err := r.db.Find(&orders, OrderID).Error

	return orders, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Order.Product").Preload("Order.Toping").Preload("Order.User").Preload("Order").Preload("User").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetTransactionUserID(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Order.Product").Preload("Order.Toping").Preload("Order.User").Preload("Order").Preload("User").First(&transaction, "user_id = ? AND status = ? ", ID, "pending").Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransactionStatus(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("Product").First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		var product models.Product
		r.db.First(&product, transaction.ID)
	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}
