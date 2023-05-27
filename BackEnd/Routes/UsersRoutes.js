const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/UsersController.js");
const validator = require("../middlewares/validator");
const userSchema = require("../Utils/userSchema");
const cors = require("cors");
const multer = require("multer");
const admin = require("../middlewares/userMWPermissions");
const auth = require("../middlewares/auth");

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

router.get("/users", admin, usersController.getAllUsers);
router.post(
  "/create",
  upload.single("image"),
  [validator(userSchema)],
  usersController.addNewUser
);
router.post("/login", usersController.login);
router.put(
  "/user/:id",
  auth,
  upload.single("image"),
  usersController.updateUser
);

router.delete("/delete/:id", admin, usersController.DeleteUser);
router.get("/:id", auth, usersController.getUserById);
module.exports = router;
