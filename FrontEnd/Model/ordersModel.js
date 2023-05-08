const mongoose = require("mongoose");
var DB_URL = "mongodb://127.0.0.1:27017/E-Commerce";

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
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
