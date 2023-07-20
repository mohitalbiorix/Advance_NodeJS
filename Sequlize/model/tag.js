const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequlizedb");

const Tag = sequelize.define("Tags", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tag;
