// Import Database Connection

import { connection } from "../config/database.js";

// Fetches All Tasks from DB
export async function getTasks(req, res) {
  const query = "select * from tasks";

  const tasks = await new Promise((res, rej) => {
    try {
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error);
          return rej(error);
        }
        return res(results);
      });
    } catch (err) {
      console.log("Error Happend Try Again");
    }
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;

  res.statusMessage = "Code working bro don't worry trust the chad";

  res.end(JSON.stringify(tasks));
}
