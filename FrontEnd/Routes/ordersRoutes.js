const express = require("express");
const router = express.Router();
const ordersController = require("../Controllers/ordersController");
const cors = require("cors");

router.get("/orders", ordersController.getAllOrders);

module.exports = router;
