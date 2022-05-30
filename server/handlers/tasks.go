package handlers

import (
	"net/http"

	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (s *Server) CreateTask(ctx echo.Context) error {
	var reqBody spec.CreateTaskJSONBody

	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	Task := models.Task{
		Title:     reqBody.Title,
		TaskOrder: reqBody.TaskOrder,
		ListID:    int64(reqBody.ListId),
	}

	if err := Task.Insert(ctx.Request().Context(), s.Db, boil.Infer()); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, Task)
}

func (s *Server) UpdateTask(ctx echo.Context, taskId spec.TaskId) error {
	// Get Task from DB using id
	Task, err := models.FindTask(ctx.Request().Context(), s.Db, int64(taskId))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	// Extract data from request body
	var reqBody spec.UpdateTaskForm
	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	if reqBody.Title != nil {
		Task.Title = *reqBody.Title
	}
	if reqBody.ListId != nil {
		Task.ListID = int64(*reqBody.ListId)
	}
	if reqBody.TaskOrder != nil {
		Task.TaskOrder = *reqBody.TaskOrder
	}

	if _, err := Task.Update(ctx.Request().Context(), s.Db, boil.Infer()); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}
	return ctx.JSON(http.StatusOK, Task)
}
