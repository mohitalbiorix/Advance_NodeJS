const { Sequelize } = require("sequelize");

/*  Passing parameters separately (database_name, username, password) */
const sequlize = new Sequelize("emp_sequlize", "root", "Albiorix@1234", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  pool: { max: 5, min: 0, idle: 10000 },
  logging: true, // if we don't need to print query
});

module.exports = sequlize;
