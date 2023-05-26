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
    quantity: data.quantity,
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
    let product = await productsModel.findById(id);
    const { title, price, quantity, details, college } = req.body;
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

    // Update only the properties that are provided in the request body
    product.title = title || product.title;
    product.price = price || product.price;
    product.details = details || product.details;
    product.college = college || product.college;

    if (quantity) {
      product.quantity = Math.max(0, product.quantity - quantity);
      if (product.quantity === 0) {
        product.statue = "sold";
        console.log(product.statue);
      }
    }

    product.image = image;

    await product.save(); // Save the updated product
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
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
