const config = require('config');
const mongoose = require('mongoose');
var DB_URL= config.get('mongo.uri');
const mongoOptions = config.get('mongo.options');
mongoose.connect(DB_URL, mongoOptions);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const productsSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  details: {
    type: "string",
    required: true,
  },
  college: {
    type: "string",
    required: true,
  }
  // userID: {
  //   type: "number",
  //   required: true,
  // },
});
module.exports = mongoose.model('Product', productsSchema);

