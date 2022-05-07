import { createResource, createSignal, Index } from "solid-js";
import { Box, HStack } from "@hope-ui/solid";

import type { Accessor } from "solid-js";

import List from "./components/list";
import AddList from "./components/add-list";

type List = {
  id: number;
  title: string;
};

// Replace this with openapi genertated code
async function fetchLists(): Promise<List[]> {
  const response = await fetch("http://localhost:8080/lists");
  return response.json();
}

export default function Board() {
  const [lists, { mutate }] = createResource(fetchLists);

  const [tasks] = createSignal([
    {
      id: 1,
      listId: 1,
      title: "Create basic presentational components using solidjs",
    },
    { id: 2, listId: 2, title: "Add tasks in the lists" },
    {
      id: 3,
      listId: 4,
      title: "Setup solidjs boiler plate code using vite template",
    },
    { id: 4, listId: 3, title: "Push changes to github" },
    { id: 5, listId: 5, title: "Add tailwindcss to the project" },
    { id: 6, listId: 1, title: "Create form to add new list" },
  ]);

  function handleSubmit(listName: Accessor<string>) {
    if (listName().trim().length !== 0) {
      mutate((lists) => [
        ...lists,
        { id: lists.length + 1, title: listName(), taskIds: [] },
      ]);
    }
  }

  return (
    <Box
      p="$6"
      width="100%"
      h="inherit"
      display="flex"
      bgColor="$info8"
      overflow="auto"
    >
      <HStack spacing="$4" alignItems="start" h="100%">
        <Index each={lists()}>
          {(list) => (
            <List
              list={list()}
              tasks={tasks().filter(({ listId }) => listId === list().id)}
            />
          )}
        </Index>

        <AddList onSubmit={handleSubmit} />
      </HStack>
    </Box>
  );
}
