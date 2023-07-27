package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/middleware"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repositories"

	"github.com/gorilla/mux"
)

func OrderRoutes(r *mux.Router) {
	orderRepository := repositories.RepositoryOrder(mysql.DB)
	h := handlers.HandlerOrder(orderRepository)

	r.HandleFunc("/orders", middleware.Auth(h.FindOrders)).Methods("GET")
	r.HandleFunc("/order/{id}", middleware.Auth(h.GetOrder)).Methods("GET")
	r.HandleFunc("/order", middleware.Auth(h.CreateOrder)).Methods("POST")
	r.HandleFunc("/order/{id}", middleware.Auth(h.UpdateOrderTransaction)).Methods("PATCH")
	r.HandleFunc("/order/{id}", middleware.Auth(h.DeleteOrder)).Methods("DELETE")

}
