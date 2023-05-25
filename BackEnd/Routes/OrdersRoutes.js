const express = require("express");
const router = express.Router();
const ordersController = require("../Controllers/OrdersController");
const cors = require("cors");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/userMWPermissions");

router.get("/orders", auth, ordersController.getAllOrders);
router.post("/create", auth, ordersController.createOrder);
router.put("/order/:id", auth, ordersController.updateOrder);
router.delete("/delete/:id", auth, ordersController.deleteOrder);
router.get("/:id", auth, ordersController.getOrderbyid);

module.exports = router;
