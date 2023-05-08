const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const productRouter = require("./Routes/productsRoutes");
const orderRouter = require("./Routes/ordersRoutes");
const userRouter = require("./Routes/usersRoutes");
const cors = require('cors');

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);

//start server
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
