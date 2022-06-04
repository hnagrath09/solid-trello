package db_wrappers

import (
	"context"
	"database/sql"

	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

type Wrappers struct {
	Db  *sql.DB
	Ctx context.Context
}

func (w *Wrappers) FindAndUpdateTask(taskId spec.Id, newTask spec.UpdateTaskForm) (*models.Task, error) {
	Task, err := models.FindTask(w.Ctx, w.Db, string(taskId))
	if err != nil {
		return &models.Task{}, err
	}
	if newTask.Title != nil {
		Task.Title = *newTask.Title
	}
	if newTask.ListId != nil {
		Task.ListID.String = *newTask.ListId
	}
	if newTask.TaskOrder != nil {
		Task.TaskOrder = *newTask.TaskOrder
	}

	if _, err := Task.Update(w.Ctx, w.Db, boil.Infer()); err != nil {
		return &models.Task{}, err
	}

	return Task, nil
}
