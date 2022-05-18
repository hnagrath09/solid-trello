import apiService from "utils/api-service";

export async function fetchLists() {
  const { data } = await apiService.getAllLists();
  return data;
}
