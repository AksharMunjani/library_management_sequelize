const Joi = require("joi");
const { models } = require("../../sequelize/index");
const { getIdParam } = require("../helpers");

const addUserValidation = Joi.object({
  id: Joi.number(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.getAll = async (req, res) => {
  const data = await models.user.findAll();
  res.status(200).json(data);
};

module.exports.create = async (req, res) => {
  try {
    const { value, error } = addUserValidation.validate(req.body);
    if (error) {
      throw error;
    }
    const data = await models.user.create(value);
    res.json({ data: data });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ error: error });
  }
};
