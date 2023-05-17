const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
const validator = require("../middlewares/validator");
const userSchema = require("../Utils/userSchema");
const cors = require("cors");
const multer = require("multer");
const userPermissions = require("../middlewares/userMWPermissions");

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/users", userPermissions, usersController.getAllUsers);
router.post(
  "/create",
  upload.single("image"),
  [validator(userSchema)],
  usersController.addNewUser
);
router.post("/login", usersController.login);
router.put("/user/:id", usersController.updateUser);
router.delete("/delete/:id", usersController.DeleteUser);
router.get("/:id", usersController.getUserById);
module.exports = router;
