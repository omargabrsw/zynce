import { Task } from "./class-task.js";
export async function fetchTasks() {
  try {
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
  } catch (err) {
    console.error(err);
  }
}

export async function storeTask(task) {
  try {
    const response = await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;", // Indicate the content type
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
