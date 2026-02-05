// dotenv Import

import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

// mysql Module Import

import mysql from "mysql";

// Make Database Connection

export const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
