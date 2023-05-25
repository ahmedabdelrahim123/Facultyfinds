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
  try {
    let id = req.params.id;
    let product = await productsModel.findById({ _id: id });
    const { title, price, details, college } = req.body;
    let image = product.image;
    if (req.file) {
        image = req.file.filename;

      if (product.image && product.image !== image) {
        // If the existing image is different from the new image, delete the old image file
        fs.unlinkSync(`products/${product.image}`);
      }
    } else if (!req.body.image) {
      image = product.image;
    }
    await productsModel.updateOne(
      { _id: req.params.id },
      { title, price,details, college, image },
      { new: true }
    );
    res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    console.error(error);
  }
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
