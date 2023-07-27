package handlers

import (
	"context"
	dto "dumbmerch/dto/result"
	topingdto "dumbmerch/dto/toping"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerToping struct {
	TopingRepository repositories.TopingRepository
}

func HandlerToping(TopingRepository repositories.TopingRepository) *handlerToping {
	return &handlerToping{TopingRepository}
}

func (h *handlerToping) FindTopings(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	topings, err := h.TopingRepository.FindTopings()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Create Embed Path File on Image property here ...
	// for i, p := range topings {
	// 	topings[i].Image = os.Getenv("PATH_FILE") + p.Image

	// }

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: topings}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerToping) GetToping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var toping models.Toping
	toping, err := h.TopingRepository.GetToping(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// Create Embed Path File on Image property here ...
	// toping.Image = os.Getenv("PATH_FILE") + toping.Image

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseToping(toping)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerToping) CreateToping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	price, _ := strconv.Atoi(r.FormValue("price"))

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userRole := userInfo["role"]

	if userRole != "admin" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		response := dto.ErrorResult{Code: http.StatusMethodNotAllowed, Message: "User is not admin"}
		json.NewEncoder(w).Encode(response)
		return
	}

	request := topingdto.TopingRequest{
		Name:  r.FormValue("title"),
		Price: price,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "waysbuck"})
	if err != nil {
		fmt.Println(err.Error())
	}

	toping := models.Toping{
		Name:  request.Name,
		Price: request.Price,
		Image: resp.SecureURL,
	}

	toping, err = h.TopingRepository.CreateToping(toping)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	toping, _ = h.TopingRepository.GetToping(toping.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseToping(toping)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerToping) UpdateToping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get datidlaFile from meware and store to filename variable here ...
	dataContex := r.Context().Value("dataFile") // add this code
	filename := dataContex.(string)             // add this code

	price, _ := strconv.Atoi(r.FormValue("price"))

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userRole := userInfo["role"]

	if userRole != "admin" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		response := dto.ErrorResult{Code: http.StatusMethodNotAllowed, Message: "User is not admin"}
		json.NewEncoder(w).Encode(response)
		return
	}

	request := topingdto.TopingRequest{
		Name:  r.FormValue("title"),
		Price: price,
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	toping, err := h.TopingRepository.GetToping(id)
	toping.Name = request.Name
	toping.Price = request.Price

	toping.UpdatedAt = time.Now()

	if filename != "false" {
		os.Remove("uploads/" + toping.Image)
		toping.Image = filename
	}

	data, err := h.TopingRepository.UpdateToping(toping)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseToping(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerToping) DeleteToping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	toping, err := h.TopingRepository.GetToping(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TopingRepository.DeleteToping(toping)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userRole := userInfo["role"]

	if userRole != "admin" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		response := dto.ErrorResult{Code: http.StatusMethodNotAllowed, Message: "User is not admin"}
		json.NewEncoder(w).Encode(response)
		return
	}
	deleteResponse := topingdto.DeleteResponse{
		ID: data.ID,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: deleteResponse}
	json.NewEncoder(w).Encode(response)
}

func convertResponseToping(u models.Toping) topingdto.TopingResponse {
	return topingdto.TopingResponse{
		ID:    u.ID,
		Name:  u.Name,
		Price: u.Price,
		Image: u.Image,
	}
}
