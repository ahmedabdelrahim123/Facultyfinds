const Ajv = require("ajv");
const ajv = new Ajv();

function validate(schema) {
  const validator = ajv.compile(schema);

  return function _validate(req, res, next) {
    const isValid = validator(req.body);
    if (!isValid) return res.status(400).send(validator.errors);
    next();
  };
}

module.exports = validate;
