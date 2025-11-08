import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection;

try {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("✅ Database connected successfully");
} catch (err) {
  console.error("❌ Database connection failed:", err);
  process.exit(1); // stop the server if DB connection fails
}

export default connection;



  

/* 
⚡ Alternate (non-promise) version — if you want callbacks

If you ever switch to regular mysql2 (not /promise),
then that version uses callbacks correctly:

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ DB connected successfully");
  }
});

export default connection;
*/
