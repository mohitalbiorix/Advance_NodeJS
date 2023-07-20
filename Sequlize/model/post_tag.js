const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequlizedb");

const Post_Tag = sequelize.define("Post_Tag", {
  postId: DataTypes.INTEGER,
  tagId: DataTypes.INTEGER
});

module.exports = Post_Tag;
