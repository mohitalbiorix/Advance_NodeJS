const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "../MYSql/employee.env" });

const mySqlConnection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

module.exports = mySqlConnection;
