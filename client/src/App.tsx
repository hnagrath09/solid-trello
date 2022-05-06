import { Box } from "@hope-ui/solid";
import Navbar from "components/navbar";
import type { Component } from "solid-js";
import Board from "pages/board";

const App: Component = () => {
  return (
    <Box
      display="flex"
      width="$screenW"
      height="$screenH"
      flexDirection="column"
    >
      <Navbar />
      <Board />
    </Box>
  );
};

export default App;
