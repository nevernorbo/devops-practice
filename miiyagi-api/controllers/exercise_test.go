package controllers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/nevernorbo/devops-beadando-2024/miiyagi-api/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Setup test database
func setupTestDB(t *testing.T) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}

	db.AutoMigrate(&models.Exercise{})

	models.DB = db
}

func TestFetchExercises(t *testing.T) {
	setupTestDB(t)

	testExercise := models.Exercise{
		Date:        "2024-12-14",
		Order:       1,
		Name:        "Push-ups",
		Sets:        3,
		Repetitions: 10,
	}
	models.DB.Create(&testExercise)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	FetchExercises(c)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %v", w.Code)
	}

	var response map[string][]models.Exercise
	json.Unmarshal(w.Body.Bytes(), &response)

	if len(response["data"]) != 1 {
		t.Errorf("Expected 1 exercise, got %v", len(response["data"]))
	}
	if response["data"][0].Name != "Push-ups" {
		t.Errorf("Expected Push-ups, got %v", response["data"][0].Name)
	}
}

func TestCreateExercise(t *testing.T) {
	setupTestDB(t)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	body := strings.NewReader(`{
		"date": "2024-12-14",
		"order": 1,
		"name": "Squats",
		"sets": 3,
		"repetitions": 15
	}`)
	c.Request, _ = http.NewRequest("POST", "/exercises/add", body)
	c.Request.Header.Set("Content-Type", "application/json")

	CreateExercise(c)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %v", w.Code)
	}

	// Verify the exercise was created
	var exercise models.Exercise
	models.DB.First(&exercise)
	if exercise.Name != "Squats" {
		t.Errorf("Expected Squats, got %v", exercise.Name)
	}
}
