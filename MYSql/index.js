const express = require("express");
const app = express();
const employeeRoute = require("../routes/employee-routes");
const mySqlConnect = require("../config/mysqlconnect");
const dotenv = require("dotenv");
dotenv.config({ path: "../MYSql/employee.env" });
const port = process.env.PORT || 8000;

// mysql connection
mySqlConnect.connect((err) => {
  if (!err) {
    console.log("DB connect successfully!");
  } else {
    console.log(err);
    console.log("DB connection failed");
  }
});

// json configuration
app.use(express.json());

// listen 3000 port
app.listen(port, () => {
  console.log(`express server is running on ${port} port`);
});

app.use("/api/emp", employeeRoute);
