import { createSignal, Match, ParentComponent, Switch } from "solid-js";
import { useNavigate } from "solid-app-router";
import {
  Box,
  CircularProgress,
  CircularProgressIndicator,
} from "@hope-ui/solid";

import { User } from "api";
import Storage from "utils/storage";
import { useMutation, useQuery } from "utils/solid-query";
import { AuthContext } from "context/auth-context";
import { fetchUserByEmail } from "pages/login/queries";
import { fetchUserProfile } from "queries/auth";

const AuthProvider: ParentComponent = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = createSignal<User | undefined>(undefined);

  const state = useQuery(["me"], fetchUserProfile, {
    onSuccess: (data) => setUser(data),
  });

  const { mutate: login } = useMutation(fetchUserByEmail, {
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
      Storage.set(import.meta.env.VITE_AUTH_TOKEN, data.token);
    },
  });

  function logout() {
    setUser(undefined);
    Storage.remove(import.meta.env.VITE_AUTH_TOKEN);
    navigate("/login");
  }

  return (
    <Switch>
      <Match when={state.isLoading}>
        <Box
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress indeterminate>
            <CircularProgressIndicator />
          </CircularProgress>
        </Box>
      </Match>

      <Match when={!state.isLoading}>
        <AuthContext.Provider value={{ user, login, logout }}>
          {props.children}
        </AuthContext.Provider>
      </Match>
    </Switch>
  );
};

export default AuthProvider;
