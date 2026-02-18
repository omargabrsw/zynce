//Import taskController
import { TaskController } from "../controllers/taskController.js";
import { setCorsHeaders, sendServerError } from "../helper/http-helper.js";

const taskController = new TaskController();

export async function handleRoutes(request, response) {
  try {
    setCorsHeaders(response);
    if (request.method === "OPTIONS") {
      response.writeHead(204);
      return response.end();
    }
    //Create Task
    if (request.method === "POST" && request.url === "/api/tasks") {
      return await taskController.createTask(request, response);
    }
    //Get Tasks
    if (request.method === "GET" && request.url === "/api/tasks") {
      return await taskController.getTasks(request, response);
    }
    //Edit Task
    if (request.method === "PATCH" && request.url === "/api/tasks") {
      return await taskController.editTask(request, response);
    }
    //Delete Task
    if (request.method === "DELETE" && request.url === "/api/tasks") {
      return await taskController.deleteTask(request, response);
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end();
    return;
  } catch (err) {
    sendServerError(response, err);
  }
}
