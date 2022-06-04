package db_wrappers

import (
	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func (w *Wrappers) FindAndUpdateList(listId spec.Id, newList spec.UpdateListForm) (*models.List, error) {
	List, err := models.FindList(w.Ctx, w.Db, string(listId))
	if err != nil {
		return &models.List{}, err
	}
	if newList.Title != nil {
		List.Title = *newList.Title
	}
	if newList.ListOrder != nil {
		List.ListOrder = *newList.ListOrder
	}

	if _, err := List.Update(w.Ctx, w.Db, boil.Infer()); err != nil {
		return &models.List{}, err
	}

	return List, nil
}
