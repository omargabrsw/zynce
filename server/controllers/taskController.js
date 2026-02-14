// Import Database Connection
import { connection } from "../config/database.js";

export class TaskController {
  // Fetches All Tasks from DB
  async getTasks(request, response) {
    const query = "select * from tasks";
    const tasks = await new Promise((resolve, reject) => {
      try {
        connection.query(query, (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          return resolve(results);
        });
      } catch (err) {
        console.log("Error Happend Try Again");
      }
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.statusCode = 200;
    response.statusMessage = "Code working bro don't worry trust the chad";
    response.end(JSON.stringify(tasks));
  }
  // Create and Store task
  async createTask(request, response) {
    const query = `INSERT INTO tasks (task_name, task_description, status)
      VALUES (?, ?, ?)`;
    let task = await new Promise((resolve, reject) => {
      let chunks = "";
      request.on("data", (chunk) => {
        chunks += chunk.toString();
      });
      request.on("end", () => {
        resolve(JSON.parse(chunks));
      });
      request.on("error", (err) => reject(err));
    });
    const results = await new Promise((resolve, reject) => {
      connection.query(
        query,
        [task.name, task.desc, task.status],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results.insertId);
        },
      );
    });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.statusCode = 201;
    response.statusMessage = "Task Added bruv";
    response.end(
      JSON.stringify({
        id: results.insertId,
      }),
    );
  }
}
