const express = require("express");
// const multer = require("multer");
// const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const productRouter = require("./Routes/ProductsRoutes");
const orderRouter = require("./Routes/OrdersRoutes");
const userRouter = require("./Routes/UsersRoutes");
const paymentRouter = require("./Routes/PaymentRoutes");
const cors = require("cors");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);

app.use("/uploads", express.static("uploads"));

//start server
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
