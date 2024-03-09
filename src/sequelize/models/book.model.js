const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("book", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
    },
  });
};
