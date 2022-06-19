import { createSignal, ParentComponent } from "solid-js";
import { User } from "api";
import { AuthContext } from "context/auth-context";
import { useMutation } from "utils/solid-query";
import { fetchUserByEmail } from "pages/login/queries";
import { createStore } from "solid-js/store";
import { useNavigate } from "solid-app-router";

const AuthProvider: ParentComponent = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = createStore<User | undefined>(undefined);

  const { mutate: login } = useMutation(fetchUserByEmail, {
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/");
    },
  });

  return (
    <AuthContext.Provider value={{ user, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
