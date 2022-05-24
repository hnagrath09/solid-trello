import { QueryClient } from "react-query/core";
import { Box } from "@hope-ui/solid";
import Navbar from "components/navbar";
import type { Component } from "solid-js";
import Board from "pages/board";
import { QueryClientProvider } from "utils/solid-query";

const client = new QueryClient();

const App: Component = () => {
  return (
    <QueryClientProvider client={client}>
      <Box
        display="flex"
        width="$screenW"
        height="$screenH"
        flexDirection="column"
      >
        <Navbar />
        <Board />
      </Box>
    </QueryClientProvider>
  );
};

export default App;
