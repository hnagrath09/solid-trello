package handlers

import (
	"database/sql"
	"log"
	"net/http"

	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	"github.com/hnagrath09/solid-trello/db-api/db_wrappers"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type Server struct {
	Db *sql.DB
}

func (s *Server) GetAllLists(ctx echo.Context) error {
	lists, err := models.Lists(qm.Load(models.ListRels.Tasks)).All(ctx.Request().Context(), s.Db)
	if err != nil {
		log.Fatal("Error getting all lists: ", err)
	}

	var respBody []spec.List
	for _, list := range lists {
		var Tasks []spec.Task
		for _, task := range list.R.Tasks {
			Tasks = append(Tasks, spec.Task{
				Id:        task.ID,
				Title:     task.Title,
				TaskOrder: task.TaskOrder,
				ListId:    task.ListID.String,
			})
		}

		respBody = append(respBody, spec.List{
			Id:        list.ID,
			Title:     list.Title,
			ListOrder: list.ListOrder,
			Tasks:     Tasks,
		})
	}

	return ctx.JSON(http.StatusOK, respBody)
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

func (s *Server) UpdateList(ctx echo.Context, listId spec.Id) error {
	listWrapper := db_wrappers.Wrappers{Db: s.Db, Ctx: ctx.Request().Context()}

	// Extract data from request body
	var reqBody spec.UpdateListForm
	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	List, err := listWrapper.FindAndUpdateList(listId, reqBody)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, List)
}

func (s *Server) ReorderLists(ctx echo.Context) error {
	listWrapper := db_wrappers.Wrappers{Db: s.Db, Ctx: ctx.Request().Context()}

	var reqBody spec.ReorderListsJSONBody
	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	for _, list := range reqBody {
		listId := spec.Id(list.ListId)
		newList := spec.UpdateListForm{
			ListOrder: &list.ListOrder,
		}
		if _, err := listWrapper.FindAndUpdateList(listId, newList); err != nil {
			return ctx.JSON(http.StatusBadRequest, err)
		}
	}

	return ctx.JSON(http.StatusOK, models.List{})
}
