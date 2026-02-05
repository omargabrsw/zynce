// dotenv Import

import "dotenv/config";

// mysql Module Import

import mysql from "mysql";

// Make Database Connection

export const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
