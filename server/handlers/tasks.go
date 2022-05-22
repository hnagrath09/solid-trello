package handlers

import (
	"net/http"

	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (s *Server) CreateTask(ctx echo.Context) error {
	var Task models.Task

	var reqBody spec.CreateTaskJSONBody

	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}
	Task.Title = reqBody.Title
	Task.ListID = int64(reqBody.ListId)
	Task.TaskOrder = reqBody.TaskOrder

	if err := Task.Insert(ctx.Request().Context(), s.Db, boil.Infer()); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, Task)
}
