// Import Database Connection
import { connection } from "../config/database.js";

// TODO: Add Delete task bruv

export class TaskController {
  // Fetches All Tasks from DB

  async getTasks(request, response) {
    const query = "select * from tasks";

    try {
      const tasks = await new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });

      response.setHeader("Access-Control-Allow-Origin", "*");
      response.statusCode = 200;
      response.statusMessage = "Code working bro don't worry trust the chad";
      response.end(JSON.stringify(tasks));
    } catch (err) {
      console.error("Get Tasks Error:", err);

      response.statusCode = 500;
      response.end(
        JSON.stringify({
          message: "Failed to fetch tasks",
        }),
      );
    }
  }

  async deleteTask(request, response) {
    const query = "DELETE FROM tasks WHERE id = ?";
    try {
      const affectedRows = await new Promise((resolve, reject) => {
        connection.query(query, [request.params.id], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
      return affectedRows;
    } catch (err) {
      console.error(err);
    }
  }

  // Create and Store task
  async createTask(request, response) {
    const query = `
      INSERT INTO tasks (task_name, task_description, status)
      VALUES (?, ?, ?)
    `;

    try {
      const task = await new Promise((resolve, reject) => {
        let chunks = "";

        request.on("data", (chunk) => {
          chunks += chunk.toString();
        });

        request.on("end", () => {
          try {
            resolve(JSON.parse(chunks));
          } catch (err) {
            reject(err);
          }
        });

        request.on("error", (err) => reject(err));
      });

      const insertId = await new Promise((resolve, reject) => {
        connection.query(
          query,
          [task.name, task.desc, task.status],
          (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
          },
        );
      });

      response.setHeader("Access-Control-Allow-Origin", "*");
      response.statusCode = 201;
      response.message = "Task Made Bruv";
      response.end(JSON.stringify({ id: insertId }));
    } catch (error) {
      console.error("Create Task Error:", error);

      response.statusCode = 500;
      response.end(
        JSON.stringify({
          message: "Something went wrong",
        }),
      );
    }
  }
}
