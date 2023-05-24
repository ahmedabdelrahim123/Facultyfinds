const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/ProductsController");
const cors = require("cors");
const multer = require("multer");
const auth= require("../middlewares/auth"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "products/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/products", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);

router.post(
  "/create",
  upload.single("image"),
  productsController.createProduct
);

router.put(
  "/product/:id",
  upload.single("image"),
  productsController.updateProduct
);
router.delete("/delete/:id", productsController.deleteProduct);
module.exports = router;
