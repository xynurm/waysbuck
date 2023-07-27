package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/middleware"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransction(transactionRepository)

	r.HandleFunc("/transactions", middleware.Auth(h.FindTransactions)).Methods("GET")
	r.HandleFunc("/transaction", middleware.Auth(h.CreateTransaction)).Methods("POST")
	r.HandleFunc("/transaction", middleware.Auth(h.UpdateTransaction)).Methods("PATCH")
	r.HandleFunc("/notification", h.Notification).Methods("POST")
	r.HandleFunc("/midtrans/{id}", middleware.Auth(h.Midtrans)).Methods("GET")
}
