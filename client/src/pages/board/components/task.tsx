import { Box, Text } from "@hope-ui/solid";
import { createSortable } from "@thisbeyond/solid-dnd";
import { Task as TTask } from "../board";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortable: boolean;
    }
  }
}

type TaskProps = {
  item: TTask;
};

export default function Task(props: TaskProps) {
  const sortable = createSortable(props.item.id);

  return (
    <div
      use:sortable
      style={{
        width: "100%",
        cursor: "grab",
        opacity: sortable.isActiveDraggable ? 0.25 : 1,
      }}
    >
      <Box p="$2" shadow="$sm" bgColor="white" borderRadius="$sm">
        <Text size="sm">{props.item.title}</Text>
      </Box>
    </div>
  );
}
