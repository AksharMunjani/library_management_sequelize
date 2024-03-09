const Joi = require("joi");
const { models } = require("../../sequelize/index");
const { getIdParam } = require("../helpers");
const { Op, sequelize, literal } = require("sequelize");

const addBookValidation = Joi.object({
  id: Joi.number(),
  title: Joi.string().required(),
  genre: Joi.string().required(),
  publicationYear: Joi.number(),
});

module.exports.getAll = async (req, res) => {
  try {
    const data = await models.book.findAll();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json(error);
  }
};

module.exports.getAllAvailable = async (req, res) => {
  try {
    const holds = await models.hold.findAll();
    const holdBookIds = holds.map((hold) => hold.bookId);
    const availableBooks = await models.book.findAll({
      where: {
        id: { [Op.notIn]: holdBookIds },
      },
    });
    res.status(200).json({ data: availableBooks });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json(error);
  }
};

// module.exports.getBooksInUse = async (req, res) => {
//   try {
//     const holds = await models.hold.findAll();
//     const holdBookIds = holds.map((hold) => hold.bookId);

//     const availableBooks = await models.book.findAll({
//       where: {
//         id: { [Op.notIn]: holdBookIds },
//       },
//     });

//     res.status(200).json({ data: availableBooks });
//   } catch (error) {
//     console.log("error:", error);
//     res.status(400).json(error);
//   }
// };

module.exports.getBooksInUse = async (req, res) => {
  try {
    const availableBooks = await models.book.findAll({
      where: {
        id: {
          [Op.notIn]: literal(`
            (SELECT bookId FROM holds WHERE borrowTime BETWEEN borrowTime AND replaceTime)
          `),
        },
      },
    });
    res.status(200).json({ data: availableBooks });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json(error);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { value, error } = addBookValidation.validate(req.body);
    if (error) {
      throw error;
    }
    const data = await models.book.create(value);
    res.json({ data: data });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ error: error });
  }
};
