package handlers

import (
	"net/http"

	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
)

// @Todo: Implement signup handler
func (s *Server) CreateUser(ctx echo.Context) error {
	return ctx.JSON(http.StatusCreated, spec.User{})
}
