// Import Database Connection
import { connection } from "../config/database.js";

import {
  proccessBody,
  queryDatabase,
  sendServerError,
} from "../utils/api-utils.js";

export class TaskController {
  async createTask(request, response) {
    const query = `
      INSERT INTO tasks (task_name, task_description, status)
      VALUES (?, ?, ?)
    `;

    const task = await proccessBody(request);
    try {
      const insertId = queryDatabase(connection, query, [
        task.name,
        task.desc,
        task.status,
      ]);

      response.setHeader("Access-Control-Allow-Origin", "*");
      response.statusCode = 201;
      response.end(JSON.stringify({ id: insertId }));
    } catch (err) {
      sendServerError(response, err);
    }
  }

  // Fetches All Tasks from DB
  async getTasks(request, response) {
    const query = "select * from tasks";

    try {
      const tasks = queryDatabase(connection, query);
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.statusCode = 200;
      response.end(JSON.stringify(tasks));
    } catch (err) {
      sendServerError(response, err);
    }
  }

  // Edit Task
  async editTask(request, response) {
    try {
      proccessBody(request);
    } catch (err) {
      sendServerError(response, err);
    }
  }

  // Delete Task
  async deleteTask(request, response) {
    const query = "DELETE FROM tasks WHERE task_id = ?";
    try {
      const task = await proccessBody(request);
      queryDatabase(connection, query, [task.id]);

      response.setHeader("Access-Control-Allow-Origin", "*");
      response.statusCode = 204;
      response.end();
    } catch (err) {
      sendServerError(response, err);
    }
  }
}
