const config = require('config');
const mongoose = require('mongoose');
var DB_URL= config.get('mongo.uri');
const mongoOptions = config.get('mongo.options');
mongoose.connect(DB_URL, mongoOptions);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const orderItemSchema = new mongoose.Schema({
  pID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const ordersSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default:new Date()
  },
  product: [orderItemSchema],
  statue: {
    type: "string",
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  },
  Total: {
    type: "number",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});


module.exports = mongoose.model('Order', ordersSchema);