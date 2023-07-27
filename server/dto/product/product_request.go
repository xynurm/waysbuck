package productdto

type ProductRequest struct {
	Name  string `json:"title" form:"title" gorm:"type: varchar(255)" validate:"required"`
	Price int    `json:"price" form:"price" gorm:"type: int" validate:"required"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
}
