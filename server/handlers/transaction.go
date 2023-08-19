package handlers

import (
	dto "dumbmerch/dto/result"
	transactiondto "dumbmerch/dto/transaction"
	"os"
	"strconv"
	"time"

	"dumbmerch/models"
	"dumbmerch/repositories"
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

// var c = coreapi.Client{
// 	ServerKey: os.Getenv("SERVER_KEY"),
// 	ClientKey: os.Getenv("CLIENT_KEY"),
// }

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))
	userRole := userInfo["role"]

	if userRole == "admin" {
		transactions, err := h.TransactionRepository.FindTransactions()

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		var responseTransaction []transactiondto.TransactionResponse

		for _, t := range transactions {
			responseTransaction = append(responseTransaction, convertResponseTransaction(t))
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: "success", Data: responseTransaction}
		json.NewEncoder(w).Encode(response)
	}

	transaction, err := h.TransactionRepository.FindTransactionsUser(userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var responseTransaction []transactiondto.TransactionResponse

	for _, t := range transaction {
		responseTransaction = append(responseTransaction, convertResponseTransaction(t))
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: responseTransaction}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	request := new(transactiondto.TransactionRequest)
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

	timeMilli := time.Now()
	var TransIdIsMatch = false
	var TransactionId int
	for !TransIdIsMatch {
		TransactionId = int(timeMilli.Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {
			TransIdIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:     TransactionId,
		Status: "pending",
		Amount: request.Amount,
		UserID: userId,
	}

	dataTransaction, err := h.TransactionRepository.CreateTransaction(transaction)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	transactionUser, err := h.TransactionRepository.GetTransaction(dataTransaction.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseTransaction(transactionUser)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userID := int(userInfo["id"].(float64))

	request := new(transactiondto.TransactionResponse)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	transaction, _ := h.TransactionRepository.GetTransaction(userID)

	transaction.Amount = request.Amount
	transaction.UserID = userID
	transaction.Status = request.Status
	transaction.UpdatedAt = time.Now()

	_, err = h.TransactionRepository.UpdateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// DataSnap, _ := h.TransactionRepository.GetTransactionAdmin(transaction.ID)

	// // 1. Initiate Snap client
	// var s = snap.Client{}
	// s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// // Use to midtrans.Production if you want Production Environment (accept real transaction).

	// // 2. Initiate Snap request param
	// req := &snap.Request{
	// 	TransactionDetails: midtrans.TransactionDetails{
	// 		OrderID:  strconv.Itoa(DataSnap.ID),
	// 		GrossAmt: int64(DataSnap.Total),
	// 	},
	// 	CreditCard: &snap.CreditCardDetails{
	// 		Secure: true,
	// 	},
	// 	CustomerDetail: &midtrans.CustomerDetails{
	// 		FName: DataSnap.User.Fullname,
	// 		Email: DataSnap.User.Email,
	// 	},
	// }

	// // 3. Execute request create Snap transaction to Midtrans Snap API
	// snapResp, _ := s.CreateTransaction(req)

	// w.WriteHeader(http.StatusOK)
	// response := dto.SuccessResult{Status: "Success", Data: snapResp}
	// json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) Midtrans(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	transactionUser, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox) //Using midtrans.Production in real transaction

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transactionUser.ID),
			GrossAmt: int64(transactionUser.Amount),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transactionUser.User.Name,
			Email: transactionUser.User.Email,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API/////////////////////
	snapResp, _ := s.CreateTransaction(req)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: snapResp}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)
	// transaction, _ := h.TransactionRepository.GetOneTransaction(orderId)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransactionStatus("pending", orderId)
		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			// SendMail("success", transaction)
			h.TransactionRepository.UpdateTransactionStatus("success", orderId)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		// SendMail("success", transaction)
		h.TransactionRepository.UpdateTransactionStatus("success", orderId)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		// SendMail("failed", transaction)
		h.TransactionRepository.UpdateTransactionStatus("failed", orderId)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		// SendMail("failed", transaction)
		h.TransactionRepository.UpdateTransactionStatus("failed", orderId)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransactionStatus("success", orderId)
	}

	w.WriteHeader(http.StatusOK)
}

// func SendMail(status string, transaction models.Transaction) {

// 	if status != transaction.Status && (status == "success") {
// 		var CONFIG_SMTP_HOST = "smtp.gmail.com"
// 		var CONFIG_SMTP_PORT = 587
// 		var CONFIG_SENDER_NAME = "Waysbuck <riki.wahyudi@gmail.com>"
// 		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
// 		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

// 		var product_title = "Waysbuck"
// 		var price = strconv.Itoa(transaction.Amount)

// 		mailer := gomail.NewMessage()
// 		mailer.SetHeader("From", CONFIG_SENDER_NAME)
// 		mailer.SetHeader("To", transaction.User.Email)
// 		mailer.SetHeader("Subject", "Transaction Status")
// 		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
// 	  <html lang="en">
// 		<head>
// 		<meta charset="UTF-8" />
// 		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
// 		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 		<title>Document</title>
// 		<style>
// 		  h1 {
// 		  color: brown;
// 		  }
// 		</style>
// 		</head>
// 		<body>
// 		<h2>Product payment :</h2>
// 		<ul style="list-style-type:none;">
// 		  <li>Product 			: %s</li>
// 		  <li>Total Payment		: Rp.%s</li>
// 		  <li>Status 			: <b>%s</b></li>
// 		</ul>
// 		<h4 style="margin-bottom:100px;">Thanks for ordering in Waysbuck Platform</h4>
// 		<h4 style="margin-bottom:5px;">Best Regard,<h4><br>
// 		<b>Waysbuck International Ltd<b>
// 		</body>
// 	  </html>`, product_title, price, status))

// 		dialer := gomail.NewDialer(
// 			CONFIG_SMTP_HOST,
// 			CONFIG_SMTP_PORT,
// 			CONFIG_AUTH_EMAIL,
// 			CONFIG_AUTH_PASSWORD,
// 		)

// 		err := dialer.DialAndSend(mailer)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		}

// 		log.Println("Mail sent! to " + transaction.User.Email)
// 	}
// }

func convertResponseTransaction(t models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		ID:              t.ID,
		Order:           t.Order,
		Status:          t.Status,
		UserTransaction: t.User,
		Amount:          t.Amount,
	}
}
