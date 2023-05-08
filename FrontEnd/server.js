const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce?directConnection=true', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
// Define product schema
const productSchema ={
_id: Number,
title: String,
price: String,
image: String,
details: String,
college: String
};

// Define product model
const Product = mongoose.model('Product', productSchema, 'products');

// Define API routes

app.get('/products', (req, res) => {
  Product.find({})
  .then(products => {
    res.json(products);
  })
  .catch(err => {
    console.log(err);
  });
});


//start server
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
