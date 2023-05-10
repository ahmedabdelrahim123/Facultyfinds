// const validate = require("../Utils/coursesValidation");
const usersModel = require("../Model/usersModel");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  var data = req.body;
  // const valid = validate(data);

  // if (!valid) console.log(validate.errors);
  // else {
    var newUser = new usersModel(data);
    await newUser.save();
    await res.json(newUser);
  // }
};

module.exports = {
  getAllUsers,
  addNewUser
};
