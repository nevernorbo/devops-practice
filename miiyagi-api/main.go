package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nevernorbo/devops-beadando-2024/miiyagi-api/controllers"
	"github.com/nevernorbo/devops-beadando-2024/miiyagi-api/models"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	// Define metrics
	httpRequestsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total number of HTTP requests",
		},
		[]string{"method", "endpoint", "status"},
	)

	httpRequestDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "http_request_duration_seconds",
			Help:    "Duration of HTTP requests",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"method", "endpoint"},
	)
)

// Prometheus middleware for Gin
func prometheusMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.FullPath()
		method := c.Request.Method

		// Process request
		c.Next()

		// Record metrics after request is processed
		status := c.Writer.Status()
		duration := time.Since(start)

		httpRequestsTotal.WithLabelValues(method, path, string(rune(status))).Inc()
		httpRequestDuration.WithLabelValues(method, path).Observe(duration.Seconds())
	}
}

func main() {
	router := gin.Default()

	// Add prometheus middleware
	router.Use(prometheusMiddleware())

	// Add prometheus metrics endpoint
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	models.ConnectDatabase()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://172.30.0.3:5173", "http://172.30.0.3", "http://miiyagi.dojo:5173", "http://miiyagi.dojo"},
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
		router_group.POST("/exercises/update/:id", controllers.UpdateExercise)
	}

	router.Run()
}
