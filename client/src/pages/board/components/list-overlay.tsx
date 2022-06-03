import { For } from "solid-js";
import { Box, Text, VStack } from "@hope-ui/solid";
import { List } from "api";
import AddTask from "./add-task";
import TaskOverlay from "./task-overlay";

export default function ListOverlay(props: { list: List }) {
  const tasks = () => props.list.tasks ?? [];
  const sortedTasks = () =>
    [...tasks()].sort((a, b) => a.taskOrder - b.taskOrder);

  return (
    <Box
      w="$64"
      flex="none"
      display="flex"
      maxH="fit-content"
      borderRadius="$sm"
      bgColor="$neutral5"
      flexDirection="column"
    >
      <Text size="sm" fontWeight={700} mb="$2" px="$4" pt="$2">
        {props.list.title}
      </Text>

      <VStack p="$2" spacing="$2" alignItems="flex-start" mb="$2">
        <For each={sortedTasks()}>{(task) => <TaskOverlay item={task} />}</For>
      </VStack>

      <AddTask listId={props.list.id} tasksCount={tasks().length} />
    </Box>
  );
}
