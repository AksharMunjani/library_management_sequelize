const { DataTypes } = require("sequelize");
const user = require("./user.model");
const book = require("./book.model");

module.exports = (sequelize) => {
  sequelize.define("hold", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: "id",
      },
    },
    bookId: {
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: book,
        key: "id",
      },
    },
    borrowTime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    replaceTime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  });
};
