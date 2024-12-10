package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nevernorbo/devops-beadando-2024/miiyagi-api/controllers"
	"github.com/nevernorbo/devops-beadando-2024/miiyagi-api/models"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://172.30.0.3:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/health", controllers.HealthCheck)

	router_group := router.Group("/api")
	{
		router_group.GET("/exercises", controllers.FetchExercises)
		router_group.POST("/exercises/add", controllers.CreateExercise)
		router_group.DELETE("/exercises/delete/:id", controllers.DeleteExercise)
		router_group.GET("/exercises/fetch/:date", controllers.FetchExercisesForDate)
	}

	router.Run()
}
