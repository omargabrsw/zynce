import { Task } from "./class-task.js";
export async function fetchTasks() {
  const response = await fetch("http://localhost:8000/api/tasks");
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  const tasks = data.map((task) => {
    return new Task(
      task.task_id,
      task.task_name,
      task.task_description,
      task.status,
    );
  });
  return tasks;
}
