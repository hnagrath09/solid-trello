import { Box, Text } from "@hope-ui/solid";
import { Task } from "api";

export default function TaskOverlay(props: { item: Task }) {
  return (
    <Box p="$2" shadow="$sm" bgColor="white" borderRadius="$sm">
      <Text size="sm">{props.item?.title}</Text>
    </Box>
  );
}
