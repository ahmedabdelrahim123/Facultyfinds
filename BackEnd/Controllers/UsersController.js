const validate = require("../Utils/userSchema");
const usersModel = require("../Model/usersModel");
const bcrypt = require("bcrypt");

let getAllUsers = async (req, res) => {
  let data = await usersModel.find({});
  res.json(data);
};

let addNewUser = async (req, res) => {
  let data = req.body;
  const valid = true;

  if (!valid) {
    return res.status(400).send("invalid data"+ error.details[0].message);
  } else {
    // validateUser(req, res);
    let testingUserByEmail = await usersModel.findOne({
      email: req.body.email,
    });
    let testingUserByUsername = await usersModel.findOne({
      username: req.body.username,
    });
    //error.details[0].message
    if (testingUserByEmail) {
      return res.status(400).send("Email already taken");
    } else if (testingUserByUsername) {
      return res.status(400).send("Username already taken");
    }
    //////////////////////////////

    let newUser = new usersModel(data);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    await res.json(newUser);
  }
};


//update
let updateUser = async (req, res) => {
  try {
    // Authenticate user making the request
    let id = req.params.id;
    const user = await usersModel.findById({_id: id});
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: 'cant find id ' });
    }

    // Update user record in the database
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send({ message: 'cant save' });
  }
};



  // let addNewUser = async (req, res) => {
  //   var data = req.body;
  //   if(req.file){
  //     data.image = req.file.path;
  //   }else{
  //     data.image = 'assets/products/avatar.png';
  //   }
  //   var newUser = new usersModel(data);
  //   await newUser.save();
  //   const { _id, username, email, gender, type, orders } = newUser;
  //   res.json({ user: { _id, username, email, gender, type, orders, image: data.image } });
  // };
  










let login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  try {
    let user = await usersModel.findOne({email: email, password: password});
    console.log(user);
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
  // console.log("user: " + user);
  // if (!user) {
  //   console.log("Invalid Credentials");
  //   res.json({ message: "Invalid Credentials" });
  // } else {
  //   console.log("in");
  //   res.json(user);
  // }

  // res.json(user);
};


module.exports = {
  getAllUsers,
  addNewUser,
  login,
  updateUser
};
