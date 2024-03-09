const Joi = require("joi");
const { models } = require("../../sequelize/index");
const { getIdParam } = require("../helpers");

const addAuthorValidation = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  biography: Joi.string().required(),
});

module.exports.getAll = async (req, res) => {
  const data = await models.author.findAll();
  res.status(200).json(data);
};

module.exports.create = async (req, res) => {
  try {
    const { value, error } = addAuthorValidation.validate(req.body);
    if (error) {
      throw error;
    }
    const data = await models.author.create(value);
    res.json({ data: data });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ error: error });
  }
};
