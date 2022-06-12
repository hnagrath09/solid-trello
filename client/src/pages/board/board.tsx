import { createSignal, For } from "solid-js";
import orderBy from "lodash/orderBy";
import { Box, HStack } from "@hope-ui/solid";
import { arrayMoveImmutable } from "array-move";
import {
  closestCenter,
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
} from "@thisbeyond/solid-dnd";
import type {
  CollisionDetector,
  Draggable,
  DragEventHandler,
  Droppable,
} from "@thisbeyond/solid-dnd";
import { useQuery, useMutation, useQueryClient } from "utils/solid-query";

import List from "./components/list";
import AddList from "./components/add-list";
import { fetchLists, reorderLists } from "./queries";
import ListOverlay from "./components/list-overlay";
import TaskOverlay from "./components/task-overlay";

export default function Board() {
  const state = useQuery("lists", fetchLists);
  const [activeItem, setActiveItem] = createSignal(null);

  const queryClient = useQueryClient();
  const { mutate: listReorder } = useMutation(reorderLists, {
    onSuccess: () => queryClient.invalidateQueries("lists"),
  });

  const lists = () => state.data?.map((list) => list) ?? [];
  const sortedLists = () => orderBy(lists(), (list) => list.listOrder);

  const listIds = () => lists().map((list) => list.id);

  const isList = (id: string | number) => listIds().includes(id as string);

  const getListId = (id: string | number) => {
    return lists().find((list) => list.tasks?.some((task) => task.id === id))
      .id;
  };

  const closestContainerOrItem: CollisionDetector = (
    draggable,
    droppables,
    context
  ) => {
    const closestList = closestCenter(
      draggable,
      droppables.filter(({ id }) => isList(id)),
      context
    );
    // If list is being dragged over, return the usual closestCenter output
    if (isList(draggable.id)) {
      return closestList;
    }
    // If a task is being dragged over
    else if (closestList) {
      // list of all task ids in the closest list container
      const taskIds =
        lists()
          .find(({ id }) => id === closestList.id)
          ?.tasks?.map(({ id }) => id) ?? [];
      const closestTask = closestCenter(
        draggable,
        droppables.filter(({ id }) => taskIds.includes(id as string)),
        context
      );
      if (!closestTask) {
        return closestList;
      }

      if (getListId(draggable.id) !== closestList.id) {
        const isLastTask =
          taskIds.indexOf(closestTask.id as string) === taskIds.length - 1;

        if (isLastTask) {
          const belowLastTask =
            draggable.transformed.center.y > closestTask.transformed.center.y;

          if (belowLastTask) {
            return closestList;
          }
        }
      }
      return closestTask;
    }
  };

  const move = (
    draggable: Draggable,
    droppable: Droppable,
    onlyWhenChangingList = true
  ) => {
    const draggableListId = isList(draggable.id)
      ? draggable.id
      : getListId(draggable.id);

    const droppableListId = isList(droppable.id)
      ? droppable.id
      : getListId(droppable.id);

    if (draggableListId !== droppableListId || !onlyWhenChangingList) {
      if (isList(draggable.id)) {
        const fromIndex = sortedLists().findIndex(
          ({ id }) => id === draggable.id
        );
        const toIndex = sortedLists().findIndex(
          ({ id }) => id === droppable.id
        );
        const updatedList = arrayMoveImmutable(
          sortedLists(),
          fromIndex,
          toIndex
        );

        // Filter out lists which are not being moved
        const updatedItems = updatedList
          .map((list, index) => ({ ...list, index }))
          .filter(({ listOrder, index }) => listOrder !== index);

        if (updatedItems.length) {
          const reqBody = updatedItems.map(({ id, index }) => ({
            listId: id,
            listOrder: index,
          }));
          listReorder(reqBody);
        }
      } else {
        // @Todo: reorderTasks
      }
    }
  };

  const onDragStart: DragEventHandler = ({ draggable }) => {
    setActiveItem(draggable.id);
  };

  const onDragOver: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable && !isList(draggable.id)) {
      move(draggable, droppable);
    }
  };

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, false);
    }
    setActiveItem(null);
  };

  const allTasks = () =>
    lists().reduce(
      (acc, list) => (list.tasks === null ? acc : [...acc, ...list.tasks]),
      []
    );

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      collisionDetector={closestContainerOrItem}
    >
      <DragDropSensors />
      <Box
        p="$6"
        width="100%"
        h="inherit"
        display="flex"
        bgColor="$info8"
        overflow="auto"
      >
        <HStack spacing="$4" alignItems="start" h="100%">
          <SortableProvider ids={listIds()}>
            <For each={sortedLists()}>{(list) => <List list={list} />}</For>
          </SortableProvider>
          <AddList listCount={lists().length} />
        </HStack>
      </Box>

      <DragOverlay>
        {isList(activeItem()) ? (
          <ListOverlay list={lists().find(({ id }) => id === activeItem())} />
        ) : (
          <TaskOverlay
            item={allTasks().find(({ id }) => id === activeItem())}
          />
        )}
      </DragOverlay>
    </DragDropProvider>
  );
}
