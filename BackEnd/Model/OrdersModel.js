const mongoose = require("mongoose");
var DB_URL = "mongodb+srv://samarsamy484:samar@cluster0.yvo61fo.mongodb.net/E-Commerce";

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const ordersSchema = new mongoose.Schema({
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
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  },
  userID: {
    type: "number",
    required: true,
  },
});
module.exports = mongoose.model('Order', ordersSchema);
