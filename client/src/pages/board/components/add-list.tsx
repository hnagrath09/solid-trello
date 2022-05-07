import { batch, createSignal, Show } from "solid-js";
import { HiOutlineX } from "solid-icons/hi";
import { Box, Button, HStack, Input, VStack } from "@hope-ui/solid";
import type { Accessor } from "solid-js";

type AddListProps = {
  onSubmit: (listName: Accessor<string>) => void;
};

export default function AddList(props: AddListProps) {
  const { onSubmit } = props;
  const [listName, setListName] = createSignal("");
  const [isCreateList, setIsCreateList] = createSignal(false);

  const handleSubmit = () => {
    onSubmit(listName);
    batch(() => {
      setIsCreateList(false);
      setListName("");
    });
  };

  const handleCancel = batch(() => {
    setIsCreateList(false);
    setListName("");
  });

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    setListName(e.currentTarget.value);
  };

  return (
    <Show
      when={isCreateList()}
      fallback={
        <Button
          w="$72"
          variant="solid"
          colorScheme="primary"
          onClick={() => setIsCreateList(true)}
        >
          + Add New List
        </Button>
      }
    >
      <VStack
        p="$2"
        w="$72"
        as="form"
        spacing="$2"
        bgColor="white"
        borderRadius="$md"
        alignItems="flex-start"
        onSubmit={handleSubmit}
      >
        <Input
          fullWidth
          size="sm"
          autoFocus
          value={listName()}
          onInput={handleInput}
        />
        <HStack spacing="$2">
          <Button size="sm" type="submit">
            Create List
          </Button>
          <Box
            as="button"
            cursor="pointer"
            bg="transparent"
            aria-label="close-form"
            onClick={handleCancel}
            _focus={{ outline: "none" }}
          >
            <HiOutlineX size="20px" />
          </Box>
        </HStack>
      </VStack>
    </Show>
  );
}
