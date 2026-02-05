// dotenv Import
import "dotenv/config";
// mysql import
import mysql from "mysql";
// HTTP NodeJS Module import
import * as http from "node:http";
// Make Web Server
const server = http.createServer();
// Make Database Connection
const connection = mysql.createPoolCluster({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

async function getTasks() {
  const query = "select * from tasks";

  return new Promise((res, rej) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return rej(error);
      }
      return res(results);
    });
  });
}
server.on("request", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET" && req.url === "/api/tasks") {
    let tasks = await getTasks();
    res.statusCode = 200;
    res.statusMessage = "Code working bro don't worry trust the chad";
    res.end(JSON.stringify(tasks));
  } else {
    res.writeHead(404, "Not Found");
  }
});
server.listen(8000, "127.0.0.1");
