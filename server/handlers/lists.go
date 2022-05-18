package handlers

import (
	"database/sql"
	"log"
	"net/http"

	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

type Server struct {
	Db *sql.DB
}

func (s *Server) GetAllLists(ctx echo.Context) error {
	lists, err := models.Lists().All(ctx.Request().Context(), s.Db)

	if err != nil {
		log.Fatal("Error getting all lists: ", err)
	}

	return ctx.JSON(http.StatusOK, lists)
}

func (s *Server) CreateList(ctx echo.Context) error {
	var List models.List

	var reqBody spec.CreateListJSONBody

	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}
	List.Title = reqBody.Title
	List.ListOrder = reqBody.ListOrder

	if err := List.Insert(ctx.Request().Context(), s.Db, boil.Infer()); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, List)
}
