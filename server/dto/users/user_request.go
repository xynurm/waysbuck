package usersdto

type CreateUserRequest struct {
	Name     string `json:"fullName" form:"fullName" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}

type UpdateUserRequest struct {
	Name     string `json:"fullName" form:"fullName"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
}
