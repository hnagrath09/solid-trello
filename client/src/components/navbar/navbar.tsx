import { Avatar, Box, Text } from "@hope-ui/solid";
import type { Component } from "solid-js";

const Navbar: Component = () => {
  return (
    <Box display="flex" alignItems="center" px="$6" py="$4" bgColor="$info11">
      <Text color="$info4" size="sm" fontWeight={600}>
        Solid Trello
      </Text>
      <Box flex={1} />
      <Avatar size="xs" name="Himanshu Nagrath" />
    </Box>
  );
};

export default Navbar;
