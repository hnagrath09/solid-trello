import { LoginDto, User } from "api";
import { createContext } from "solid-js";

export const AuthContext = createContext<{
  user: User | undefined;
  login: (req: LoginDto) => void;
}>({
  user: undefined,
  login: () => {},
});
