import { createResource, Index } from "solid-js";
import { Box, HStack } from "@hope-ui/solid";

import type { Accessor } from "solid-js";

import List from "./components/list";
import AddList from "./components/add-list";

export type Task = {
  id: number;
  title: string;
  listId: number;
  order: number;
};

export type List = {
  id: number;
  title: string;
  tasks: Task[];
  order: number;
};

// Replace this with openapi genertated code
async function fetchLists(): Promise<List[]> {
  const response = await fetch("http://localhost:8080/lists");
  return response.json();
}

export default function Board() {
  const [lists, { mutate }] = createResource(fetchLists);

  const handleSubmit = (listName: Accessor<string>) => {
    if (listName().trim().length !== 0) {
      mutate((lists) => [
        ...lists,
        {
          id: lists.length + 1,
          title: listName(),
          tasks: [],
          order: lists.length + 1,
        },
      ]);
    }
  };

  const reorderList = (updatedList: List) => {
    mutate((lists) =>
      lists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };

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
          {(list) => <List list={list()} onUpdate={reorderList} />}
        </Index>
        <AddList onSubmit={handleSubmit} />
      </HStack>
    </Box>
  );
}
