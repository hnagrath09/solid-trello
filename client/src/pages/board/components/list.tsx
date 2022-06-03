import { For } from "solid-js";
import { Box, Text, VStack } from "@hope-ui/solid";
import {
  createSortable,
  maybeTransformStyle,
  SortableProvider,
} from "@thisbeyond/solid-dnd";

import { List as TList, ReorderTasksForm } from "api";

import Task from "./task";
import AddTask from "./add-task";
import { reorderTasks } from "../queries";

type ListProps = {
  list: TList;
};

export default function List(props: ListProps) {
  const sortable = createSortable(props.list.id);
  const currentItems = () => props.list.tasks ?? [];

  const taskIds = () => currentItems().map((task) => task.id) ?? [];
  const sortedTasks = () =>
    [...currentItems()].sort((a, b) => a.taskOrder - b.taskOrder);

  // const onDragStart = ({ draggable }: { draggable: Draggable }) => {
  //   const task = currentItems().find((task) => task.id === draggable.id);
  //   setActiveItem(task);
  // };

  // const getOrder = (taskId: string) => {
  //   return currentItems().find((task) => task.id === taskId).taskOrder;
  // };

  // const onDragEnd = ({
  //   draggable,
  //   droppable,
  // }: {
  //   draggable: Draggable;
  //   droppable: Droppable;
  // }) => {
  //   if (draggable && droppable) {
  //     const currentOrder = getOrder(draggable.id as string);
  //     const newOrder = getOrder(droppable.id as string);
  //     if (currentOrder !== newOrder) {
  //       const updatedItems: ReorderTasksForm[] = [];
  //       currentItems().forEach((task) => {
  //         if (task.taskOrder === currentOrder) {
  //           updatedItems.push({ taskId: task.id, taskOrder: newOrder });
  //         } else if (currentOrder > newOrder && task.taskOrder >= newOrder) {
  //           updatedItems.push({
  //             taskId: task.id,
  //             taskOrder: task.taskOrder + 1,
  //           });
  //         } else if (currentOrder < newOrder && task.taskOrder <= newOrder) {
  //           updatedItems.push({
  //             taskId: task.id,
  //             taskOrder: task.taskOrder - 1,
  //           });
  //         }
  //       });
  //       mutate(updatedItems);
  //     }
  //   }
  //   setActiveItem(null);
  // };

  return (
    <Box
      ref={sortable.ref}
      opacity={sortable.isActiveDraggable ? 0.5 : 1}
      style={maybeTransformStyle(sortable.transform)}
    >
      <Box
        w="$64"
        flex="none"
        display="flex"
        maxH="fit-content"
        borderRadius="$sm"
        bgColor="$neutral5"
        flexDirection="column"
      >
        <Box px="$2" pt="$2" {...sortable.dragActivators}>
          <Text size="sm" fontWeight={700} mb="$2" px="$2">
            {props.list.title}
          </Text>
        </Box>

        <VStack p="$2" spacing="$2" alignItems="flex-start" mb="$2">
          <SortableProvider ids={taskIds()}>
            <For each={sortedTasks()}>{(task) => <Task item={task} />}</For>
          </SortableProvider>
        </VStack>

        <AddTask listId={props.list.id} tasksCount={sortedTasks().length} />
      </Box>
    </Box>
  );
}
