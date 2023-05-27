const validate = require("../Utils/userSchema");
const usersModel = require("../Model/UsersModel");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const fs= require('fs');
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
  try {
    let id = req.params.id;
    let user = await usersModel.findById({ _id: id });
    const { email, username, password, gender } = req.body;
    let image = user.image;

    // Check if a new image was uploaded
    if (req.file) {
      // If a new image was uploaded, set the image variable to the filename of the new image
      image = req.file.filename;

      if (user.image && user.image !== image) {
        // If the existing image is different from the new image, delete the old image file
        fs.unlinkSync(`uploads/${user.image}`);
      }
    } else if (!req.body.image) {
      // If no new image was uploaded and no image field was passed in the form data,
      // reuse the existing image in the user's profile data
      image = user.image;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password , salt);
    await usersModel.updateOne(
      { _id: req.params.id },
      { email, username,password: hashedPassword, gender, image },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
  }
}

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
  let id = req.params.id;
  let user = await usersModel.findById({ _id: id });
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
