package productdto

type ProductResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"title"`
	Price int    `json:"price"`
	Image string `json:"image"`
}

type DeleteResponse struct {
	ID int `json:"id"`
}
