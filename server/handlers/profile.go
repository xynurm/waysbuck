package handlers

import (
	profiledto "dumbmerch/dto/profile"
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) FindProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userRole := userInfo["role"]
	userId := int(userInfo["id"].(float64))
	if userRole == "admin" {
		profiles, err := h.ProfileRepository.FindProfile()
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Profile User Kosong"}
			json.NewEncoder(w).Encode(response)
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: "success", Data: profiles}
		json.NewEncoder(w).Encode(response)
	} else {

		profile, err := h.ProfileRepository.GetProfileUser(userId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Profile User Kosong"}
			json.NewEncoder(w).Encode(response)
		} else {

			w.WriteHeader(http.StatusOK)
			response := dto.SuccessResult{Status: "success", Data: profile}
			json.NewEncoder(w).Encode(response)
		}

	}
}

func (h *handlerProfile) CreateProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))
	poscode, _ := strconv.Atoi(r.FormValue("pos_code"))

	request := profiledto.CreateUserRequest{
		Phone:   r.FormValue("phone"),
		Address: r.FormValue("address"),
		PosCode: poscode,
	}

	profile, err := h.ProfileRepository.GetProfileUser(userId)

	if err != nil {
		profiles := models.Profile{
			UserID:  userId,
			Phone:   request.Phone,
			PosCode: request.PosCode,
			Address: request.Address,
		}
		data, err := h.ProfileRepository.CreateProfile(profiles)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
		}
		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: "success", Data: data}
		json.NewEncoder(w).Encode(response)
	}
	if profile.ID != 0 {

		if request.Phone != "" {
			profile.Phone = request.Phone
		}

		if request.PosCode != 0 {
			profile.PosCode = request.PosCode
		}

		if request.Address != "" {
			profile.Address = request.Address
		}

		data, err := h.ProfileRepository.UpdateProfile(profile)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
		}

		w.WriteHeader(http.StatusOK)
		response := dto.SuccessResult{Status: "success", Data: data}
		json.NewEncoder(w).Encode(response)

	}
}
