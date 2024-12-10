package models

type Exercise struct {
	ID          uint   `json:"id" gorm:"primary_key"`
	Date        string `json:"date"`
	Order       uint   `json:"order"`
	Name        string `json:"name"`
	Sets        uint   `json:"sets"`
	Repetitions uint   `json:"repetitions"`
}
