const express = require("express");
const router = express.Router();
// ???
const usersController = require("../Controllers/usersController.js");
const cors = require("cors");


router.get("/users", usersController.getAllUsers);
router.post("/create",usersController.addNewUser);
router.post("/login", usersController.login);
router.put("/users/:id", usersController.updateUser);
module.exports = router;
