package main

import (
	"os"
	"time"

	middleware "pro-trader/middleware"
	routes "pro-trader/routes"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
)

func main() {
    port := os.Getenv("PORT")

    if port == "" {
        port = "8000"
    }

    router := gin.New()
    router.Use(gin.Logger())
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173", "http://localhost:5173/login"}, // Specify the origin of the frontend
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))    

    routes.UserRoutes(router)
    router.Use(middleware.Authentication())

    
    // API-2
    router.GET("/api-1", func(c *gin.Context) {

        c.JSON(200, gin.H{"success": "Access granted for api-1"})

    })

    // API-1
    router.GET("/api-2", func(c *gin.Context) {
        c.JSON(200, gin.H{"success": "Access granted for api-2"})
    })

    router.Run(":" + port)
}
