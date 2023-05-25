// const validate = require("../Utils/coursesValidation");
const ordersModel = require("../Model/OrdersModel");
const jwt = require("jsonwebtoken");

// const session = require("../middlewares/session");


let getAllOrders = async (req, res) => {
  // let data = await ordersModel.find({}).populate('userID', 'username').populate('product.pID', 'title price');
  // res.json(data);
  let data = await ordersModel.find({}).populate('userID', 'username').populate('product.pID', 'title price');
  const totalOrdersCount = await ordersModel.countDocuments();
  const pendingOrders = await ordersModel.find({ statue: 'pending' }).countDocuments();
  const rejectedOrders = await ordersModel.find({ statue: 'rejected' }).countDocuments();
  res.json({data, totalOrdersCount, pendingOrders, rejectedOrders});
};


let createOrder = async (req, res) => {
  let products = req.body.products.map(product => {
    return {
      pID: product.pID,
      quantity: product.quantity
    };
  });
  let neworder = new ordersModel({
    product: products,
    userID: req.body.userID,
    Total: req.body.Total
  });
  await neworder.save();
  await res.json(neworder);
};



let updateOrder = async (req, res) => {
  let Id = req.params.id; 
  data=req.body;
    await ordersModel.updateOne(
      { _id: Id },
      {
        statue: data.statue,
      }
    );
    await res.send("updated successfully");
};

let deleteOrder = async (req, res) => {
  var ID = req.params.id;

  var order = await ordersModel.findOne({ _id: ID });
  
  if (order.statue !='accepted')
  {
    await ordersModel.deleteOne({ _id: ID });
    res.json(order.statue || "Not Found");
  }
  else {
    res.json("this order is already accepted can't be deleted");
  }
};

let getOrderbyid = async (req, res) => {
  let id = req.params.id;
  let order = await ordersModel.findById({_id: id});
  res.json(order);
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderbyid
};
