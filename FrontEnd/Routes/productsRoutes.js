const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/productsController");
const cors = require("cors");


router.get("/products", productsController.getAllProducts);

module.exports = router;
