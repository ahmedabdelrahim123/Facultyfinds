const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
const validator = require("../middlewares/validator");
const userSchema = require("../Utils/userSchema");
const cors = require("cors");
const multer=require("multer");
// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
router.get("/users", usersController.getAllUsers);
router.post("/create", upload.single('image'), [validator(userSchema)],  usersController.addNewUser);
router.post("/login", usersController.login);

module.exports = router;
