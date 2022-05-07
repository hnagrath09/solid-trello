package constants

import spec "github.com/hnagrath09/solid-trello/oapi-specs"

var tasks = []spec.Task{
	{Id: 1, ListId: 1, Title: "Create basic presentational components using solidjs"},
	{Id: 2, ListId: 2, Title: "Add tasks in the lists"},
	{Id: 3, ListId: 4, Title: "Setup solidjs boiler plate code using vite template"},
	{Id: 4, ListId: 3, Title: "Push changes to github"},
	{Id: 5, ListId: 5, Title: "Add tailwindcss to the project"},
	{Id: 6, ListId: 1, Title: "Create form to add new list"},
}

func Lists() []spec.List {
	lists := []spec.List{
		{Id: 1, Title: "Todo", Tasks: []spec.Task{}},
		{Id: 2, Title: "In Progress", Tasks: []spec.Task{}},
		{Id: 3, Title: "In Review", Tasks: []spec.Task{}},
		{Id: 4, Title: "Done", Tasks: []spec.Task{}},
		{Id: 5, Title: "Cancelled", Tasks: []spec.Task{}},
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
