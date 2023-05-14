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
  let data = req.body;
  const valid = true;

  if (!valid) {
    return res.status(400).send("invalid data" + error.details[0].message);
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
const updateUser = async (req, res) => {
  let Id = req.params.id;
  let data = req.body;
  // const valid = userValid(data);
  // if (!valid) res.send("Not Compatible..");
  // else {
   
    await usersModel.updateOne(
      { _id: Id },
      {
        username: req.body.username,
        email: req.body.email, 
        image: req.body.image,
        gender: req.body.gender,
        type: req.body.type,
      }
    );
    await res.send("updated successfully");
  // }
};



// let updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const update = req.body;
//     const user = await usersModel.findByIdAndUpdate(id, update, { new: true });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


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
  // console.log(email, password);

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
  return res.status(200).json({user:user ,token: Token});
};



//Delete
let deleteUser = async (req, res, next) => {
  res.send("bts");
  // try {
  //   let id = req.params.id;
  //   const user = await usersModel.findByIdAndDelete({_id: id});
  //   if (!user) {
  //     return res.status(404).json({
  //       success: false,
  //       message: 'User not found',
  //     });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     message: 'User deleted successfully',
  //     data: user,
  //   });
  // } catch (error) {
  //   next(error);
  // }
};


module.exports = {
  getAllUsers,
  addNewUser,
  login,
  updateUser,
  deleteUser
};
