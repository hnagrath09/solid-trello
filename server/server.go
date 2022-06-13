package main

import (
	"database/sql"
	"log"

	db_api "github.com/hnagrath09/solid-trello/db-api"
	"github.com/hnagrath09/solid-trello/handlers"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Run DB migrations
	db_api.Migrator()

	db, err := sql.Open("postgres", `dbname=trello host=localhost user=postgres password=Test12345 sslmode=disable`)
	if err != nil {
		log.Fatal("Error connecting to DB: ", err)
	}

	e := echo.New()

	// Logger Middleware
	e.Use(middleware.Logger())

	//Authentication Middleware
	// e.Use(middlewares.AuthMiddleware())

	// CORS Middleware
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))
	spec.RegisterHandlers(e, &handlers.Server{Db: db})

	e.Logger.Fatal(e.Start(":8080"))
}
