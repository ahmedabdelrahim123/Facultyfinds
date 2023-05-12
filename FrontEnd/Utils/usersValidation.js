const Ajv = require("ajv");
const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      // pattern: "^[a-zA-Z]+$",
      minLength: 3,
      

    },
    password: { type: "string", minLength: 6, maxLength: 28 },
    email: { type: "string", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
    gender: { type: "string", enum: ["male", "female"] },
  },
  required: ["username", "password", "email", "gender"],
};

module.exports = ajv.compile(userSchema);


