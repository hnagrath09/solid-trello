import { Index } from "solid-js";
import { Box, Button, Text, VStack } from "@hope-ui/solid";
import { List as TList } from "../board";

type ListProps = {
  list: TList;
};

export default function List(props: ListProps) {
  const { list } = props;

  return (
    <Box
      p="$4"
      w="$64"
      h="$96"
      flex="none"
      display="flex"
      maxH="fit-content"
      borderRadius="$sm"
      bgColor="$neutral5"
      flexDirection="column"
    >
      <Text size="sm" fontWeight={700} mb="$2" px="$2">
        {list.title}
      </Text>

      <VStack spacing="$2" alignItems="flex-start">
        <Index each={list.tasks}>
          {(task) => (
            <Box
              p="$2"
              w="100%"
              shadow="$sm"
              bgColor="white"
              borderRadius="$sm"
            >
              <Text size="sm">{task().title}</Text>
            </Box>
          )}
        </Index>
      </VStack>

      <Box flex={1} />

      <Button size="sm" variant="ghost" fullWidth>
        + Add Task
      </Button>
    </Box>
  );
}
