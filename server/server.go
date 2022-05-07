package main

import (
	"net/http"

	"github.com/hnagrath09/solid-trello/constants"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type server struct{}

func (s *server) GetAllLists(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, constants.Lists())
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))
	spec.RegisterHandlers(e, &server{})

	e.Logger.Fatal(e.Start(":8080"))
}
