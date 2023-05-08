// const validate = require("../Utils/coursesValidation");
const usersModel = require("../Model/usersModel");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

module.exports = {
  getAllUsers
};
