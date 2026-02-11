import { renderKanban } from "./views/kanban.js";

async function fetchTasks(){

  const response = await fetch("http://localhost:8000/api/tasks");

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}
let tasks = await fetchTasks()
renderKanban(tasks);
