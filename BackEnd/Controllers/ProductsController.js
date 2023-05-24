// const validate = require("../Utils/coursesValidation");
const productsModel = require("../Model/productsModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let getAllProducts = async (req, res) => {
  const college = req.query.college;
  // console.log(college);
  let data = [];

  if (college) {
    data = await productsModel.find({ college: college });
  } else {
    data = await productsModel.find({});
  }

  res.json(data);
};

let getProductById = async (req, res) => {
  // console.log("in controller",req);
  let id = req.params.id;
  // console.log("in controller",req.params.id);
  let product = await productsModel.findById({ _id: id });
  // console.log("in controller",product);
  res.json(product);
};

let createProduct = async (req, res) => {
  data = req.body;
  image = req.file.filename;
  console.log(data);
  let newProduct = new productsModel({
    title: data.title,
    price: data.price,
    image: image,
    details: data.details,
    college: data.college,
    userId: data.userID,
  });
  await newProduct.save();
  await res.json(newProduct);
};

let updateProduct = async (req, res) => {
  let Id = req.params.id;
  data = req.body;

  // console.log(`data : ${data}`);
  await productsModel.updateOne(
    { _id: Id },
    {
      title: data.title,
      price: data.price,
      image: req.file.filename,
      details: data.details,
      college: data.college,
    }
  );
  await res.send("updated successfully");
};

let deleteProduct = async (req, res) => {
  var ID = req.params.id;
  var ProductToDelete = await productsModel.find({ _id: ID });
  await productsModel.deleteOne({ _id: ID });
  res.json(ProductToDelete || "Not Found");
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
