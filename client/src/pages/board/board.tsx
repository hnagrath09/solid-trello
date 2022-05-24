import { createEffect, createResource, Index } from "solid-js";
import { Box, HStack } from "@hope-ui/solid";

import type { Accessor } from "solid-js";

import List from "./components/list";
import AddList from "./components/add-list";
import { createNewList, fetchLists } from "./queries";
import { List as TList } from "api";
import { useMutation, useQuery, useQueryClient } from "utils/solid-query";

export default function Board() {
  const state = useQuery("lists", fetchLists);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createNewList, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
    },
  });

  const lists = () => state.data?.map((list) => list);

  const handleSubmit = (listName: Accessor<string>) => {
    if (listName().trim().length !== 0) {
      mutate({ title: listName(), listOrder: lists().length + 1 });
    }
  };

  const reorderList = (updatedList: TList) => {
    // mutate((lists) =>
    //   lists.map((list) => (list.id === updatedList.id ? updatedList : list))
    // );
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
