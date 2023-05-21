const express = require("express");
const router = express.Router();
const ordersController = require("../Controllers/OrdersController");
const cors = require("cors");

router.get("/orders", ordersController.getAllOrders);
router.post("/create", ordersController.createOrder);
router.put("/order/:id", ordersController.updateOrder);
router.delete("/delete/:id", ordersController.deleteOrder);
router.get("/:id", ordersController.getOrderbyid);


module.exports = router;
