import { createSignal, ParentComponent } from "solid-js";
import { useNavigate } from "solid-app-router";

import { User } from "api";
import Storage from "utils/storage";
import { useMutation } from "utils/solid-query";
import { AuthContext } from "context/auth-context";
import { fetchUserByEmail } from "pages/login/queries";

const AuthProvider: ParentComponent = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = createSignal<User | undefined>(undefined);

  const { mutate: login } = useMutation(fetchUserByEmail, {
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
      Storage.set(import.meta.env.VITE_AUTH_TOKEN, data.token);
    },
  });

  function logout() {
    console.log("called");
    setUser(undefined);
    Storage.remove(import.meta.env.VITE_AUTH_TOKEN);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
