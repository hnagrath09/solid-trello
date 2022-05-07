package constants

import spec "github.com/hnagrath09/solid-trello/oapi-specs"

func Lists() []spec.List {
	return []spec.List{
		{Id: 1, Title: "Todo", Tasks: []spec.Task{}},
		{Id: 2, Title: "In Progress", Tasks: []spec.Task{}},
		{Id: 3, Title: "In Review", Tasks: []spec.Task{}},
		{Id: 4, Title: "Done", Tasks: []spec.Task{}},
		{Id: 5, Title: "Cancelled", Tasks: []spec.Task{}},
	}
}
