import { createSignal, For } from "solid-js";
import { Box, Text, VStack } from "@hope-ui/solid";
import {
  closestCenter,
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
} from "@thisbeyond/solid-dnd";
import type { Draggable, Droppable } from "@thisbeyond/solid-dnd";

import { List as TList, ReorderTasksForm } from "api";
import { useMutation, useQueryClient } from "utils/solid-query";

import Task from "./task";
import AddTask from "./add-task";
import { reorderTasks } from "../queries";

type ListProps = {
  list: TList;
};

export default function List(props: ListProps) {
  const currentItems = () => props.list.tasks ?? [];
  const [activeItem, setActiveItem] = createSignal(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(reorderTasks, {
    onSuccess: () => queryClient.invalidateQueries("lists"),
  });

  const taskIds = () => currentItems().map((task) => task.id) ?? [];
  const sortedTasks = () =>
    [...currentItems()].sort((a, b) => a.taskOrder - b.taskOrder);

  const onDragStart = ({ draggable }: { draggable: Draggable }) => {
    const task = currentItems().find((task) => task.id === draggable.id);
    setActiveItem(task);
  };

  const getOrder = (taskId: number) => {
    return currentItems().find((task) => task.id === taskId).taskOrder;
  };

  const onDragEnd = ({
    draggable,
    droppable,
  }: {
    draggable: Draggable;
    droppable: Droppable;
  }) => {
    if (draggable && droppable) {
      const currentOrder = getOrder(draggable.id as number);
      const newOrder = getOrder(droppable.id as number);
      if (currentOrder !== newOrder) {
        const updatedItems: ReorderTasksForm[] = [];
        currentItems().forEach((task) => {
          if (task.taskOrder === currentOrder) {
            updatedItems.push({ taskId: task.id, taskOrder: newOrder });
          } else if (currentOrder > newOrder && task.taskOrder >= newOrder) {
            updatedItems.push({
              taskId: task.id,
              taskOrder: task.taskOrder + 1,
            });
          } else if (currentOrder < newOrder && task.taskOrder <= newOrder) {
            updatedItems.push({
              taskId: task.id,
              taskOrder: task.taskOrder - 1,
            });
          }
        });
        mutate(updatedItems);
      }
    }
    setActiveItem(null);
  };

  return (
    <DragDropProvider
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <Box
        p="$2"
        w="$64"
        flex="none"
        display="flex"
        maxH="fit-content"
        borderRadius="$sm"
        bgColor="$neutral5"
        flexDirection="column"
      >
        <Text size="sm" fontWeight={700} mb="$2" px="$2">
          {props.list.title}
        </Text>

        <VStack spacing="$2" alignItems="flex-start" mb="$2">
          <SortableProvider ids={taskIds()}>
            <For each={sortedTasks()}>{(task) => <Task item={task} />}</For>
          </SortableProvider>
        </VStack>

        <DragOverlay>
          <Box
            p="$2"
            w="$full"
            shadow="$sm"
            bgColor="white"
            cursor="grabbing"
            borderRadius="$sm"
          >
            <Text size="sm">{activeItem()?.title}</Text>
          </Box>
        </DragOverlay>

        <AddTask listId={props.list.id} tasksCount={sortedTasks().length} />
      </Box>
    </DragDropProvider>
  );
}
