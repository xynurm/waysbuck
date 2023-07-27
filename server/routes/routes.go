package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	AuthRoutes(r)
	ProductRoutes(r)
	TopingRoutes(r)
	OrderRoutes(r)
	TransactionRoutes(r)
	ProfileRoutes(r)
}
