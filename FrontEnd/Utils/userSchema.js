// const Ajv = require("ajv");
// const ajv = new Ajv();

// const userSchema = {
//   type: "object",
//   properties: {
//     username: {
//       type: "string",
//       // pattern: "^[a-zA-Z]+$",
//       minLength: 3,
//     },
//     password: { type: "string", minLength: 6, maxLength: 28 },
//     email: { type: "string", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
//     gender: { type: "string", enum: ["male", "female"] },
//   },
//   required: ["username", "password", "email", "gender"],
// };

// module.exports = userSchema;

// module.exports = ajv.compile(userSchema);

// import { string, number, object } from "joi";
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
