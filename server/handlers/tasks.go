package handlers

import (
	"net/http"

	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	"github.com/hnagrath09/solid-trello/db-api/db_wrappers"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/null/v8"
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
		ListID:    null.String{String: reqBody.ListId, Valid: true},
	}

	if err := Task.Insert(ctx.Request().Context(), s.Db, boil.Infer()); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, Task)
}

func (s *Server) UpdateTask(ctx echo.Context, taskId spec.TaskId) error {
	taskWrapper := db_wrappers.Wrappers{Db: s.Db, Ctx: ctx.Request().Context()}

	// Extract data from request body
	var reqBody spec.UpdateTaskForm
	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	Task, err := taskWrapper.FindAndUpdateTask(taskId, reqBody)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusOK, Task)
}

func (s *Server) ReorderTasks(ctx echo.Context) error {
	taskWrapper := db_wrappers.Wrappers{Db: s.Db, Ctx: ctx.Request().Context()}

	var reqBody spec.ReorderTasksJSONBody
	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	for _, task := range reqBody {
		taskId := spec.TaskId(task.TaskId)
		newTask := spec.UpdateTaskForm{
			TaskOrder: &task.TaskOrder,
		}
		if _, err := taskWrapper.FindAndUpdateTask(taskId, newTask); err != nil {
			return ctx.JSON(http.StatusBadRequest, err)
		}
	}

	return ctx.JSON(http.StatusOK, models.Task{})
}
