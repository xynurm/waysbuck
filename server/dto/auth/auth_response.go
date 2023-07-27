package authdto

type LoginResponse struct {
	Name  string `gorm:"type: varchar(255)" json:"fullName"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type RegisterResponse struct {
	Name  string `gorm:"type: varchar(255)" json:"fullName"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type CheckAuthResponse struct {
	Id    int    `gorm:"type: int" json:"id"`
	Name  string `gorm:"type: varchar(255)" json:"name"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Role  string `gorm:"type: varchar(50)"  json:"role"`
}
