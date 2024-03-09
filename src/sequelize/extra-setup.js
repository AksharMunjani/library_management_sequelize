function applyExtraSetup(sequelize) {
  const { book, author, user, hold } = sequelize.models;

  user.belongsToMany(book, { through: hold });
  book.belongsToMany(user, { through: hold });

  // user.hasMany(book);
  // book.belongsTo(user);
}

module.exports = { applyExtraSetup };
