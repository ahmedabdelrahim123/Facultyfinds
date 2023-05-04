const config = require('config');
const mongoose = require('mongoose');
var DB_URL= config.get('mongo.uri');
const mongoOptions = config.get('mongo.options');
// var mongoOptions={ "useNewUrlParser": true}
mongoose.connect(DB_URL, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const ordersSchema = new mongoose.Schema({
 // relaions
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
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