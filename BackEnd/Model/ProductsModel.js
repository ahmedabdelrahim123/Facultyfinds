const config = require('config');
const mongoose = require('mongoose');
var DB_URL= config.get('mongo.uri');
const mongoOptions = config.get('mongo.options');
mongoose.connect(DB_URL, mongoOptions)
  .then(() => {
    console.log('Product database connection established successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const productsSchema = new mongoose.Schema({
  _id: {
    type: "number",
    required: true,
  },
  title: {
    type: "string",
    required: true,
  },
  price: {
    type: "string",
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
});
module.exports = mongoose.model('Product', productsSchema);

