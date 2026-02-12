import { fetchTasks } from "./features/todos/api.js";
import { renderKanban } from "./features/todos/templates/kanban.js";
let tasks = await fetchTasks();
renderKanban(tasks);
