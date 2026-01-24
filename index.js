import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'to-do-list',
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
