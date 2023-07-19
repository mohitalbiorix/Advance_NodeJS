const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequlizedb");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    // timestamps:false // show created and updated time based on value
    // updatedAt: false // show updated time based on value
    // createdAt: false // show created time based on value,
    // engine: 'MYISAM' change dataypes of table
    // tableName: 'userdata' // create  new table
  }
);

module.exports = User;
