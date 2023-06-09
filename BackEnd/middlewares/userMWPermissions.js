var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // var token = req.header("x-auth-token");
  var token = req.headers.authorization;

  if (!token) return res.status(401).send("login first please...");

  var decodedPayload = jwt.verify(token, "thistokensecret");
  // console.log(decodedPayload);
  if (decodedPayload.userType === "admin") {
    next(); //isAdmin
  } else {
    res.status(401).send("You are not an admin");
  }
};
