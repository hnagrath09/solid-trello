package main

import (
	"fmt"

	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
)

type server struct{}

func (s *server) GetAllLists(ctx echo.Context) error {
	fmt.Println("fetch all lists here")
	return nil
}

func main() {
	e := echo.New()
	spec.RegisterHandlers(e, &server{})

	e.Logger.Fatal(e.Start(":8080"))
}
