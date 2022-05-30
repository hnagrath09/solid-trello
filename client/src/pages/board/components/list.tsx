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

import Task from "./task";
import { List as TList } from "api";
import AddTask from "./add-task";

type ListProps = {
  list: TList;
  onUpdate: (newList: TList) => void;
};

export default function List(props: ListProps) {
  const [activeItem, setActiveItem] = createSignal(null);
  const currentItems = () => props.list.tasks ?? [];

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
        const updatedItems = currentItems().map((task) => {
          if (task.taskOrder === currentOrder) {
            return { ...task, taskOrder: newOrder };
          }
          if (currentOrder > newOrder && task.taskOrder >= newOrder) {
            return { ...task, taskOrder: task.taskOrder + 1 };
          }
          if (currentOrder < newOrder && task.taskOrder <= newOrder) {
            return { ...task, taskOrder: task.taskOrder - 1 };
          }
          return task;
        });
        const updatedList = { ...props.list, tasks: updatedItems };
        props.onUpdate(updatedList);
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
