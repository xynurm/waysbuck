package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	FindProfile() ([]models.Profile, error)
	GetProfileUser(ID int) (models.Profile, error)
	CreateProfile(profile models.Profile) (models.Profile, error)
	GetUserID(ID int) (models.User, error)
	UpdateProfile(profile models.Profile) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProfile() ([]models.Profile, error) {
	var profiles []models.Profile
	err := r.db.Find(&profiles).Error

	return profiles, err
}

func (r *repository) GetProfileUser(ID int) (models.Profile, error) {
	var profile models.Profile
	err := r.db.Preload("User").First(&profile, "user_id = ?", ID).Error

	return profile, err
}

func (r *repository) CreateProfile(profile models.Profile) (models.Profile, error) {
	err := r.db.Create(&profile).Error

	return profile, err
}

func (r *repository) GetUserID(ID int) (models.User, error) {
	var users models.User
	err := r.db.Preload("User").Find(&users, ID).Error

	return users, err
}

func (r *repository) UpdateProfile(profile models.Profile) (models.Profile, error) {
	err := r.db.Save(&profile).Error

	return profile, err
}

// func (r *repository) DeleteUser(user models.User) (models.User, error) {
// 	err := r.db.Delete(&user).Error

// 	return user, err
// }
