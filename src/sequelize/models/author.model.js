const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("author", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
  });
};
