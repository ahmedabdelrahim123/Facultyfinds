const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  email: Joi.string().email().required(),

  gender: Joi.string().valid("male", "female").required(),

  // type: Joi.string().valid("user", "admin").required(),

  // image: Joi.string(),
}).unknown();
module.exports = userSchema;