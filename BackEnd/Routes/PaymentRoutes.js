const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/PaymentController");
const cors = require("cors");

router.post("/checkout", paymentController.checkout);

module.exports = router;