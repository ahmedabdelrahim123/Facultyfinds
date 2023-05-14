const express = require("express");
const router = express.Router();
// ???
const usersController = require("../Controllers/UsersController.js");
const validator = require("../middlewares/validator");
const userSchema = require("../Utils/userSchema");
const cors = require("cors");

router.get("/users", usersController.getAllUsers);
router.post("/create", [validator(userSchema)], usersController.addNewUser);
router.post("/login", usersController.login);
router.put("/users/:id", usersController.updateUser);
router.delete("/:id", usersController.DeleteUser);
router.get("/:id", usersController.getUserById);
module.exports = router;
