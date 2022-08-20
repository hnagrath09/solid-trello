import { QueryClient } from "react-query/core";
import { Route, Routes } from "solid-app-router";
import Board from "pages/board";
import { QueryClientProvider } from "utils/solid-query";
import Login from "pages/login";
import AuthProvider from "components/auth-provider";
import AuthWrapper from "components/auth-wrapper";

const client = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthWrapper />}>
            <Route path="/" element={<Board />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
