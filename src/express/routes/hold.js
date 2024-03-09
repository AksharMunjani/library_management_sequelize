const Joi = require("joi");
const { models } = require("../../sequelize/index");
const { getIdParam } = require("../helpers");

const addHoldValidation = Joi.object({
  id: Joi.number(),
  userId: Joi.number(),
  bookId: Joi.number(),
  borrowTime: Joi.date().iso(),
  replaceTime: Joi.date().iso(),
});

module.exports.getAll = async (req, res) => {
  const data = await models.hold.findAll();
  res.status(200).json(data);
};

const calculateReplaceTime = () => {
  const enddate = new Date();
  enddate.setDate(enddate.getDate() + 15); // 15 days
  return enddate.toISOString();
};

module.exports.create = async (req, res) => {
  try {
    let param = {
      ...req?.body,
      borrowTime: new Date().toISOString(),
      replaceTime: calculateReplaceTime(),
    };
    const { value, error } = addHoldValidation.validate(param);
    if (error) {
      throw error;
    }
    const data = await models.hold.create(value);
    res.json({ data: data });
  } catch (error) {
    console.log("error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const id = getIdParam(req);
    const instrument = await models.hold.findByPk(id);
    res.status(200).json(instrument);
  } catch (error) {
    res.status(404).send("404 - Not found");
  }
};
