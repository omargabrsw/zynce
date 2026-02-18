//Import taskController
import { TaskController } from "../controllers/taskController.js";
const taskController = new TaskController();

export function handleRoutes(request, response) {
  //Get Tasks
  if (request.method === "GET" && request.url === "/api/tasks") {
    return taskController.getTasks(request, response);
  }
  //Create Task
  if (request.method === "POST" && request.url === "/api/tasks") {
    return taskController.createTask(request, response);
  }
  //Delete Task
  if (request.method === "DELETE" && request.url === "/api/tasks") {
    return taskController.deleteTask(request, response);
  }
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end();
  return;
}
