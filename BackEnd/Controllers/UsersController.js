const validate = require("../Utils/userSchema");
const usersModel = require("../Model/UsersModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  email = req.body.email;
  password = req.body.password;
  gender = req.body.gender;
  type = req.body.type;
  username = req.body.username;
  orders = JSON.parse(req.body.orders);
  image = req.file.filename;
  let data = req.body;
  const valid = true;
  if (!valid) {
    return res.status(400).send("invalid data" + error.details[0].message);
  } else {
    let testingUserByEmail = await usersModel.findOne({
      email: req.body.email,
    });
    let testingUserByUsername = await usersModel.findOne({
      username: req.body.username,
    });
    if (testingUserByEmail) {
      return res.status(400).send("Email already taken");
    } else if (testingUserByUsername) {
      return res.status(400).send("Username already taken");
    }
    let newUser = new usersModel({
      username: username,
      email: email,
      password: password,
      gender: gender,
      image: image,
      type: type,
      orders: orders,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    await res.json(newUser);
  }
};

//update
let updateUser = async (req, res) => {
  let Id = req.params.id;

  await usersModel.updateOne(
    { _id: Id },
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      image: req.file.filename,
      gender: req.body.gender,
    }
  );
  await res.send("updated successfully");
};

let login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await usersModel.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }
  let checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).send("Invalid email or password");
  }

  let Token = jwt.sign(
    {
      userId: user._id,
      userType: user.type,
    },
    "thistokensecret"
  );

  res.header("x-auth-token", Token);
  return res.status(200).json({ user: user, token: Token });
};

let DeleteUser = async (req, res) => {
  var ID = req.params.id;
  var UserToDelete = await usersModel.findOne({ _id: ID });
  if (UserToDelete.orders) {
    res.json("can't delete, you have unfinished orders");
  } else {
    await usersModel.deleteOne({ _id: ID });
    res.json(UserToDelete || "Not Found");
  }
};

//get user by id
let getUserById = async (req, res) => {
  // console.log("in controller",req);
  let id = req.params.id;
  // console.log("in controller",req.params.id);
  let user = await usersModel.findById({ _id: id });
  // console.log("in controller",product);
  res.json(user);
};

module.exports = {
  getAllUsers,
  addNewUser,
  login,
  updateUser,
  DeleteUser,
  getUserById,
};
