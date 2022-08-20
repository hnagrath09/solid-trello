import apiService from "utils/api-service";

export async function fetchUserProfile() {
  const { data } = await apiService.getMe();
  return data;
}
