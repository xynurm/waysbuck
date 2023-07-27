package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Name     string `json:"fullName" form:"fullName" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}

type DeleteResponse struct {
	ID int `json:"id"`
}
