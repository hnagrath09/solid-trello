import apiService from "utils/api-service";

export async function fetchLists() {
  const { data } = await apiService.getAllLists();
  return data;
}

export async function createNewList({ title, listOrder }) {
  const { data } = await apiService.createList({ title, listOrder });
  return data;
}
