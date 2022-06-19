import { LoginDto, User } from "api";
import { Accessor, createContext } from "solid-js";

export const AuthContext = createContext<{
  user: Accessor<User | undefined>;
  login: (req: LoginDto) => void;
  logout: () => void;
}>({
  user: undefined,
  login: () => {},
  logout: () => {},
});
