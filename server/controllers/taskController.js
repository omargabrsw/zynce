// Import Database Connection

import { connection } from "../config/database.js";
import { queryDatabase } from "../utils/database-utils.js";
import { proccessBody } from "../utils/api-utils.js";
import { sendServerError, setCorsHeaders } from "../helper/http-helper.js";

export class TaskController {
  async createTask(request, response) {
    try {
      const query = `
      INSERT INTO tasks (task_name, task_description, status)
      VALUES (?, ?, ?)
    `;

      const task = await proccessBody(request);
      const results = await queryDatabase(connection, query, [
        task.name,
        task.desc,
        task.status,
      ]);
      setCorsHeaders(response);
      response.statusCode = 201;
      response.end(JSON.stringify({ id: results.insertId }));
    } catch (err) {
      sendServerError(response, err);
    }
  }

  // Fetches All Tasks from DB
  async getTasks(request, response) {
    try {
      const query = "select * from tasks";

      const tasks = await queryDatabase(connection, query);
      setCorsHeaders(response);
      response.statusCode = 200;
      response.end(JSON.stringify(tasks));
    } catch (err) {
      sendServerError(response, err);
    }
  }

  // Edit Task
  async editTask(request, response) {
    try {
      const task = await proccessBody(request);

      setCorsHeaders(response);
    } catch (err) {
      sendServerError(response, err);
    }
  }

  // Delete Task
  async deleteTask(request, response) {
    try {
      const query = "DELETE FROM tasks WHERE task_id = ?";
      const task = await proccessBody(request);
      queryDatabase(connection, query, [task.id]);

      setCorsHeaders(response);
      response.statusCode = 204;
      response.end();
    } catch (err) {
      sendServerError(response, err);
    }
  }
}
