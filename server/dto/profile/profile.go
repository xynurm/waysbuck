package profiledto

type CreateUserRequest struct {
	Phone   string `json:"phone" form:"phone" `
	PosCode int    `json:"pos_code" form:"pos_code" `
	Address string `json:"address" form:"address"`
}
