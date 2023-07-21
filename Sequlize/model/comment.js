const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequlizedb");

const Comment = sequelize.define("comment", {
  title: DataTypes.STRING,
  commentableId: DataTypes.INTEGER,
  commentableType: DataTypes.STRING,
});

module.exports = Comment;
