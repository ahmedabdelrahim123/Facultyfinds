// const validate = require("../Utils/coursesValidation");
const ordersModel = require("../Model/OrdersModel");
const jwt = require("jsonwebtoken");

let getAllOrders = async (req, res) => {
  let data = await ordersModel.find({}).populate('userID', 'username').populate('pID', 'title price');
  res.json(data);
};
let createOrder = async (req, res) => {
data=req.body;
pids=JSON.parse(req.body.pID);
console.log(pids);
let neworder= new ordersModel({
  date: data.date,
  pID: pids ,
  // statue: data.statue,
  userID: data.userID
})
await neworder.save();
await res.json(neworder);
};

let updateOrder = async (req, res) => {
  let Id = req.params.id; 
  pids=JSON.parse(req.body.pID);
  data=req.body;
    await ordersModel.updateOne(
      { _id: Id },
      {
         date: data.date,
         pID: pids ,
        statue: data.statue,
        userID: data.userID
      }
    );
    await res.send("updated successfully");
};
let deleteOrder = async (req, res) => {
  var ID = req.params.id;

  var order = await ordersModel.findOne({ _id: ID });
  console.log(order.statue);

  
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
