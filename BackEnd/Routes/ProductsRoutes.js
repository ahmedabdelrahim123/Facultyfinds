const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/ProductsController");
const cors = require("cors");
const multer = require("multer");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/userMWPermissions");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "products/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/products", auth, productsController.getAllProducts);
router.get("/:id", auth, productsController.getProductById);

router.post(
  "/create",
  upload.single("image"),
  auth,
  productsController.createProduct
);

router.put(
  "/product/:id",
  upload.single("image"),
  auth,
  productsController.updateProduct
);
router.put("/productquantity/:id",auth,productsController.updateQuantityForOrder);
router.delete("/delete/:id", auth, productsController.deleteProduct);
module.exports = router;
