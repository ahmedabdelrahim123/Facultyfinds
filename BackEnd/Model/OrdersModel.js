const config = require('config');
const mongoose = require('mongoose');
var DB_URL= config.get('mongo.uri');
const mongoOptions = config.get('mongo.options');
mongoose.connect(DB_URL, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
// var DB_URL = "mongodb://127.0.0.1:27017/college";

const ordersSchema = new mongoose.Schema({
 // relaions
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    //   products: [{
    //     product: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Product',
    //       required: true
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true
    //     }
    //   }],


      status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
      },
      date: {
        type: Date,
        default: Date.now // set the default value to the current date and time
      }, 
  
  });
  
  module.exports = mongoose.model("Order", ordersSchema);