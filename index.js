import 'dotenv/config';
import mysql from 'mysql';
import http from 'node:http';
http.createServer();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
connection.connect((err) => {
  if (err) {
    console.log('error while connecting' + err.stack);
  }
});

connection.query('select * from tasks', async (err, res, fields) => {
  if (err) console.log('error');
  const taskName = res[0].task_name;
  await console.log(taskName);
});

connection.end();
