let OrdersModel = require("../Model/OrdersModel");
const ProductOrder = require("../Model/ProductOrderModel");
var validate = require("../Utils/OrdersValidation");

let create = async (req, res) => {
  try {
    const { user, status, date, products } = req.body;

    const order = new OrdersModel({
      user,
      status,
      date,
      products: []
    });
    // console.log(order);
    await order.save();

    for (const product of products) {
      const productOrder = new ProductOrder({
        product: product.product,
        // order: order._id,
        quantity: product.quantity
      });

      await productOrder.save();

      order.products.push(productOrder);
    }

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

let show = async (req, res) => {

};

let update = async (req, res) => {
 
};
let remove = async (req, res) => {
 
};
module.exports = {
  create,
  show,
  update,
  remove,
};