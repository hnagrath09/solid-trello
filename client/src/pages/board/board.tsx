import { createSignal, Index, Show } from "solid-js";
import { Box, Button, HStack, Input, VStack } from "@hope-ui/solid";
import List from "./components/list";

export default function Board() {
  const [isCreateList, setIsCreateList] = createSignal(false);
  const [listName, setListName] = createSignal("");
  const [lists, setLists] = createSignal([
    { id: 1, title: "Todo", taskIds: [1] },
    { id: 2, title: "In Progress", taskIds: [2] },
    { id: 3, title: "In Review", taskIds: [4] },
    { id: 4, title: "Done", taskIds: [3] },
    { id: 5, title: "Cancelled", taskIds: [5] },
  ]);

  const [tasks, setTasks] = createSignal([
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

  function handleSubmit() {
    if (listName().trim().length !== 0) {
      setLists((lists) => [
        ...lists,
        { id: lists.length + 1, title: listName(), taskIds: [] },
      ]);
    }
    setListName("");
    setIsCreateList(false);
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

        <Show
          when={!isCreateList()}
          fallback={
            <Box bgColor="white" w="$72" p="$2" borderRadius="$md">
              <VStack spacing="$2" alignItems="flex-start">
                <Input
                  fullWidth
                  size="sm"
                  autoFocus
                  onBlur={handleSubmit}
                  value={listName()}
                  onChange={(e) => setListName(e.target.value)}
                />
                <Button size="xs" onClick={handleSubmit}>
                  Create List
                </Button>
              </VStack>
            </Box>
          }
        >
          <Button
            w="$72"
            size="sm"
            variant="solid"
            colorScheme="primary"
            onClick={() => setIsCreateList(true)}
          >
            + Add New List
          </Button>
        </Show>
      </HStack>
    </Box>
  );
}
