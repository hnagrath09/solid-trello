package constants

import spec "github.com/hnagrath09/solid-trello/oapi-specs"

var tasks = []spec.Task{
	{Id: 1, ListId: 1, Order: 2, Title: "Create basic presentational components using solidjs"},
	{Id: 2, ListId: 2, Order: 1, Title: "Add tasks in the lists"},
	{Id: 3, ListId: 4, Order: 1, Title: "Setup solidjs boiler plate code using vite template"},
	{Id: 4, ListId: 3, Order: 1, Title: "Push changes to github"},
	{Id: 5, ListId: 5, Order: 1, Title: "Add tailwindcss to the project"},
	{Id: 6, ListId: 1, Order: 1, Title: "Create form to add new list"},
	{Id: 7, ListId: 2, Order: 2, Title: "Add sorting feature in lists"},
	{Id: 8, ListId: 1, Order: 3, Title: "Create postgres DB to persist data"},
}

func Lists() []spec.List {
	lists := []spec.List{
		{Id: 1, Title: "Todo", Tasks: []spec.Task{}, Order: 1},
		{Id: 2, Title: "In Progress", Tasks: []spec.Task{}, Order: 2},
		{Id: 3, Title: "In Review", Tasks: []spec.Task{}, Order: 3},
		{Id: 4, Title: "Done", Tasks: []spec.Task{}, Order: 4},
		{Id: 5, Title: "Cancelled", Tasks: []spec.Task{}, Order: 5},
	}

	for _, task := range tasks {
		for index, list := range lists {
			if task.ListId == list.Id {
				lists[index].Tasks = append(list.Tasks, task)
				break
			}
		}
	}

	return lists
}
