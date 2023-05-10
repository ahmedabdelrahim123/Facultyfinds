// const validate = require("../Utils/coursesValidation");
const usersModel = require("../Model/usersModel");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  let data = req.body;
  // const valid = validate(data);

  // if (!valid) console.log(validate.errors);
  // else {
  let newUser = new usersModel(data);
  await newUser.save();
  await res.json(newUser);
  // }
};

let login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let user = await usersModel.findOne({ email: email, password: password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
  // console.log("user: " + user);
  // if (!user) {
  //   console.log("Invalid Credentials");
  //   res.json({ message: "Invalid Credentials" });
  // } else {
  //   console.log("in");
  //   res.json(user);
  // }

  // res.json(user);
};

module.exports = {
  getAllUsers,
  addNewUser,
  login,
};
