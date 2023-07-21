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
      set(value) {
        this.setDataValue("username", value + " patel"); // setter methode
      },
      get() {
        return this.getDataValue("username") + " Patel";
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["male", "female"]],
      },
    },
  },
  {
    // timestamps:false // show created and updated time based on value
    // updatedAt: false // show updated time based on value
    // createdAt: false // show created time based on value,
    // engine: 'MYISAM' change dataypes of table
    // tableName: 'userdata' // create  new table
    //underscored: true, // Set underscored to true to use snake_case for column names

    //  first method to insert hook
    hooks: {
      // beforeValidate:(user,options)=>{
      //   user.username = "hook";
      // },
      // afterValidate: (user,option)=>{
      //   user.username = "hook";
      // }
    },
  }
);

// second way to add hook
User.addHook("afterValidate", (user, option) => {
  user.username = "hook2";
});

// removedhook
User.removeHook("afterValidate");

module.exports = User;
