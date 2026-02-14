//Import taskController
import { TaskController } from "../controllers/taskController.js";
const taskController = new TaskController();

export function handleRoutes(req, res) {
  //Get Tasks
  if (req.method === "GET" && req.url === "/api/tasks") {
    return taskController.getTasks(req, res);
  }
  //Create Task
  if (reg.method === "POST" && reg.url === "/api/tasks") {
    return taskController.createTask();
  }
}
