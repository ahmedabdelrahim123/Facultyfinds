const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/usersController");
const cors = require("cors");
const validator = require("../middlewares/validator");
const userSchema = require("../Utils/userSchema");

router.get("/users", usersController.getAllUsers);

router.post("/create", [validator(userSchema)], usersController.addNewUser);

router.post("/login", usersController.login);

module.exports = router;
