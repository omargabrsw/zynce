// Import Database Connection

import { connection } from "../config/database.js";
import { queryDatabase } from "../utils/database-utils.js";
import { proccessBody } from "../utils/api-utils.js";

export class TaskController {
  // Create Task
  async createTask(request, response) {
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
    response.statusCode = 201;
    response.end(JSON.stringify({ id: results.insertId }));
  }

  // Fetches All Tasks from DB
  async getTasks(request, response) {
    const query = "select * from tasks";
    const tasks = await queryDatabase(connection, query);
    console.log(tasks);
    response.statusCode = 200;
    response.end(JSON.stringify(tasks));
  }

  // Edit Task
  async editTask(request, response) {
    const task = await proccessBody(request);
    const query =
      "UPDATE tasks SET task_name = ?, task_description = ?, status = ? WHERE task_id = ?";

    await queryDatabase(connection, query, [
      task.name,
      task.desc,
      task.status,
      task.id,
    ]);

    response.statusCode = 200;
    response.end(JSON.stringify({ message: "Task updated successfully" }));
  }

  // Delete Task
  async deleteTask(request, response) {
    const query = "DELETE FROM tasks WHERE task_id = ?";
    const task = await proccessBody(request);
    await queryDatabase(connection, query, [task.id]);

    response.statusCode = 204;
    response.end();
  }
}
