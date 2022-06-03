import apiService from "utils/api-service";
import { ReorderTasksForm } from "api";

export async function fetchLists() {
  const { data } = await apiService.getAllLists();
  return data;
}

export async function createNewList({
  title,
  listOrder,
}: {
  title: string;
  listOrder: number;
}) {
  const { data } = await apiService.createList({ title, listOrder });
  return data;
}

export async function createNewTask({
  listId,
  title,
  taskOrder,
}: {
  listId: string;
  title: string;
  taskOrder: number;
}) {
  const { data } = await apiService.createTask({ title, taskOrder, listId });
  return data;
}

export async function updateTask({
  taskId,
  title,
  taskOrder,
  listId,
}: {
  taskId: string;
  title?: string;
  taskOrder?: number;
  listId?: string;
}) {
  const { data } = await apiService.updateTask(taskId, {
    title,
    taskOrder,
    listId,
  });
  return data;
}

export async function reorderTasks(reqBody: ReorderTasksForm[]) {
  const { data } = await apiService.reorderTasks(reqBody);
  return data;
}
