const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/productsController");
const cors = require("cors");
const multer = require("multer");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });
  



// const upload = multer({ storage: storage });
router.get("/products", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);

router.post(
    "/create",
    productsController.createProduct
    );
    
router.put("/product/:id", productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);
module.exports = router;
