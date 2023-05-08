// const validate = require("../Utils/coursesValidation");
const productsModel = require("../Model/productsModel");

let getAllProducts = async (req, res) => {
  let data = await productsModel.find({});
  res.json(data);
};

module.exports = {
  getAllProducts
};
