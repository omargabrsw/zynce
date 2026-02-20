import { Task } from "../model/class-task";

export async function apiCreateTask(task) {
  const response = await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function apiGetTasks() {
  const response = await fetch("http://localhost:8000/api/tasks", {
    method: "GET",
  });
  let tasks = await response.json();
  tasks = tasks.map(
    (task) => new Task(task.id, task.title, task.description, task.status),
  );
  return tasks;
}

export async function apiUpdateTask(task) {
  const response = await fetch(`http://localhost:8000/api/tasks/`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
  return response.ok();
}

export async function apiDeleteTask(task) {
  const response = await fetch(`http://localhost:8000/api/tasks/`, {
    method: "DELETE",
    body: JSON.stringify(task),
  });
  return response.ok();
}
