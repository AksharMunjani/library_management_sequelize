const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

const sequelize = new Sequelize("library", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const modelDefiners = [
  require("./models/author.model"),
  require("./models/book.model"),
  require("./models/hold.model"),
  require("./models/user.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

sequelize.sync({ force: false });

applyExtraSetup(sequelize);

module.exports = sequelize;
