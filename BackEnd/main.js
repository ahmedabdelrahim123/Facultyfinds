const express = require("express");
const app = express();
const PORT = process.env.PORT || 7008;
const OrderRouter = require("./Routes/OrdersRoutes");
const UserRouter = require("./Routes/UsersRoutes");
const ProductRouter = require("./Routes/ProductsRoutes");
const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
app.use("/api/order", OrderRouter);

app.use("/api/user", UserRouter);

app.use("/api/product", ProductRouter);


app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
