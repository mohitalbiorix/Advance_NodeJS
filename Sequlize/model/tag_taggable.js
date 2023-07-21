const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequlizedb");

const Tag_Taggable = sequelize.define("Tag_Taggable", {
  tagId: {
    type: DataTypes.INTEGER,
    unique: "tt_unique_constraint",
  },
  taggableId: {
    type: DataTypes.INTEGER,
    unique: "tt_unique_constraint",
    references: null,
  },
  taggableType: {
    type: DataTypes.STRING,
    unique: "tt_unique_constraint",
  },
});

module.exports = Tag_Taggable;
