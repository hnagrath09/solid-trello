import { AuthContext } from "context/auth-context";
import { useContext } from "solid-js";

export default function useAuth() {
  return useContext(AuthContext);
}
