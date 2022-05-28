import { createSignal, JSX, Show } from "solid-js";
import { Box, Button, IconButton, Textarea } from "@hope-ui/solid";
import { HiOutlineX } from "solid-icons/hi";
import { useMutation, useQueryClient } from "utils/solid-query";
import { createNewTask } from "../queries";

type AddTaskProps = {
  listId: number;
  tasksCount: number;
};

export default function AddTask(props: AddTaskProps) {
  const [taskTitle, setTaskTitle] = createSignal("");
  const [isTaskFormOpen, setIsTaskFormOpen] = createSignal(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createNewTask, {
    onSuccess: () => queryClient.invalidateQueries("lists"),
  });

  const handleInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (
    event
  ) => setTaskTitle(event.currentTarget.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      title: taskTitle(),
      listId: props.listId,
      taskOrder: props.tasksCount + 1,
    });
    setTaskTitle("");
  };

  return (
    <Show
      when={isTaskFormOpen()}
      fallback={
        <Button
          size="sm"
          fullWidth
          variant="ghost"
          onClick={() => setIsTaskFormOpen(true)}
        >
          + Add Task
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <Textarea
          mb="$2"
          size="sm"
          bg="white"
          value={taskTitle()}
          onInput={handleInput}
          placeholder="Enter a title for the task..."
        />
        <Box>
          <Button size="sm" mr="$2" type="submit">
            Add Task
          </Button>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="close form"
            icon={<HiOutlineX />}
            onClick={() => setIsTaskFormOpen(false)}
          />
        </Box>
      </form>
    </Show>
  );
}
