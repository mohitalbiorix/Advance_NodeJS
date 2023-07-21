const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequlizedb");

const Employee = sequelize.define(
  "Employee",
  {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    paranoid: true,
    deletedAt: "softDelete",
  }
);

module.exports = Employee;
