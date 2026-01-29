// dotenv Import
import 'dotenv/config';
// mysql import
import mysql from 'mysql';
// HTTP NodeJS Module import
import * as http from 'node:http';
// Make Web Server
const server = http.createServer();
// Make Database Connection
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Make DB Connection

async function getTasks() {
  const query = 'select * from tasks';

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
let tasks = await getTasks();

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET' && req.url === '/api/tasks') {
    res.writeHead(200, 'The API is working now bruv');
    res.end(JSON.stringify(tasks));
  } else {
    res.writeHead(404, 'Not Found');
  }
});

server.listen(8000, '127.0.0.1');
