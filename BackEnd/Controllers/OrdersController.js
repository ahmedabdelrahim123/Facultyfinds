// const validate = require("../Utils/coursesValidation");
const ordersModel = require("../Model/OrdersModel");

let getAllOrders = async (req, res) => {
  let data = await ordersModel.find({});
  res.json(data);
};

module.exports = {
  getAllOrders
};
