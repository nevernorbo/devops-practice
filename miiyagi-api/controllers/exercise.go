package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nevernorbo/devops-beadando-2024/miiyagi-api/models"
)

// GET /exercises
// Get all exercises
func FetchExercises(c *gin.Context) {
	var exercise []models.Exercise
	models.DB.Find(&exercise)

	c.JSON(http.StatusOK, gin.H{"data": exercise})
}

type CreateExerciseInput struct {
	Date        string `json:"date" binding:"required"`
	Order       uint   `json:"order"`
	Name        string `json:"name" binding:"required"`
	Sets        uint   `json:"sets"`
	Repetitions uint   `json:"repetitions"`
}

// POST /exercises/add
// Create new exercise
func CreateExercise(c *gin.Context) {
	var input CreateExerciseInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	exercise := models.Exercise{Date: input.Date, Order: input.Order, Name: input.Name, Sets: input.Sets, Repetitions: input.Repetitions}
	models.DB.Create(&exercise)

	c.JSON(http.StatusOK, gin.H{"data": exercise})
}

func DeleteExercise(c *gin.Context) {
	var exercise models.Exercise

	if err := models.DB.Where("id = ?", c.Param("id")).First(&exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	id := exercise.ID
	models.DB.Delete(&exercise)

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// GET /exercises/fetch/:date
// Create new exercise
func FetchExercisesForDate(c *gin.Context) {
	var exercises []models.Exercise

	if err := models.DB.Where("date = ?", c.Param("date")).Find(&exercises).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Records not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": exercises})
}

// POST /exercises/update/:id
func UpdateExercise(c *gin.Context) {
	// Get model if exist
	var exercise models.Exercise
	id := exercise.ID

	if err := models.DB.Where("id = ?", c.Param("id")).First(&exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input models.Exercise
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update exercise
	if err := models.DB.Model(&exercise).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update exercise"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
