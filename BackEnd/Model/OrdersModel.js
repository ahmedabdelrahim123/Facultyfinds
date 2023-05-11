const config = require('config');
const mongoose = require('mongoose');
var DB_URL= config.get('mongo.uri');
const mongoOptions = config.get('mongo.options');
mongoose.connect(DB_URL, mongoOptions)
  .then(() => {
    console.log('Order database connection established successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const ordersSchema = new mongoose.Schema({
  _id: {
    type: "number",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pID: {
    type: "array",
    required: true,
  },
  statue: {
    type: "string",
    required: true,
  },
  userID: {
    type: "number",
    required: true,
  }
},
    {timestamps: true }
  );
module.exports = mongoose.model('Order', ordersSchema);
