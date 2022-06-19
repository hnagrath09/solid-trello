import { LoginDto } from "api";
import apiService from "utils/api-service";

export async function fetchUserByEmail({ email, password }: LoginDto) {
  const { data } = await apiService.login({ email, password });
  return data;
}
