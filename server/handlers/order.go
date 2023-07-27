package handlers

import (
	orderdto "dumbmerch/dto/order"
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerOrder struct {
	OrderRepository repositories.OrderRepository
}

func HandlerOrder(OrderRepository repositories.OrderRepository) *handlerOrder {
	return &handlerOrder{OrderRepository}
}

func (h *handlerOrder) FindOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))
	userRole := userInfo["role"]

	if userRole == "admin" {
		orders, err := h.OrderRepository.FindAllOrder()

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: "success", Data: orders}
		json.NewEncoder(w).Encode(response)
	} else {

		orders, err := h.OrderRepository.FindOrdersByUser(userId)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}
		// for i, p := range orders {
		// 	orders[i].Product.Image = os.Getenv("PATH_FILE") + p.Product.Image

		// }
		var responseOrder []orderdto.OrderResponse

		for _, t := range orders {
			responseOrder = append(responseOrder, convertResponseOrder(t))
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: "success", Data: responseOrder}
		json.NewEncoder(w).Encode(response)
	}

}

func (h *handlerOrder) GetOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var order models.Order
	order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: order}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerOrder) CreateOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	request := new(orderdto.OrderRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Product Not Found!"}
		json.NewEncoder(w).Encode(response)
		return
	}

	topings, err := h.OrderRepository.FindTopingsById(request.TopingID)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Toping Not Found!"}
		json.NewEncoder(w).Encode(response)
		return
	}

	order := models.Order{
		Qty:       1,
		UserID:    userId,
		ProductID: request.ProductID,
		Toping:    topings,
		SubAmount: request.SubAmount,
		Status:    "pending",
	}

	order, err = h.OrderRepository.CreateOrder(order)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	orders, _ := h.OrderRepository.GetOrder(order.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseOrder(orders)}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerOrder) UpdateOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	qty, _ := strconv.Atoi(r.FormValue("qty"))
	request := orderdto.UpdateOrder{
		Qty: qty,
	}

	order, _ := h.OrderRepository.GetOrder(id)

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	if userId != order.UserID {
		w.WriteHeader(http.StatusUnauthorized)
		response := dto.ErrorResult{Code: http.StatusUnauthorized, Message: "Cannot update"}
		json.NewEncoder(w).Encode(response)
		return
	}

	var priceToping = 0
	for _, i := range order.Toping {
		priceToping += i.Price
	}

	var subAmount = request.Qty * (order.Product.Price + priceToping)

	order.Qty = request.Qty
	order.SubAmount = subAmount
	order.UpdatedAt = time.Now()

	order, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: order}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerOrder) UpdateOrderTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(orderdto.UpdateOrderTransaction)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)

		return
	}

	if request.TransactionID > 0 {
		order.TransactionId = &request.TransactionID
	}

	order.Status = request.Status

	data, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)

		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerOrder) DeleteOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	if userId != order.UserID {
		w.WriteHeader(http.StatusUnauthorized)
		response := dto.ErrorResult{Code: http.StatusUnauthorized, Message: "Cannot Delete Order"}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.OrderRepository.DeleteOrder(order)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	deleteResponse := orderdto.DeleteOrder{
		ID: data.ID,
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: deleteResponse}
	json.NewEncoder(w).Encode(response)
}

func convertResponseOrder(o models.Order) orderdto.OrderResponse {
	return orderdto.OrderResponse{
		ID:          o.ID,
		Product:     o.Product,
		Toping:      o.Toping,
		UserOrder:   o.User,
		Qty:         o.Qty,
		SubAmount:   o.SubAmount,
		Transaction: o.Transaction,
	}
}
