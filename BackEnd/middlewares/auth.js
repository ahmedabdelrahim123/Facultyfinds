const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  var token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    var decodedPayload = jwt.verify(token, "thistokensecret");
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
