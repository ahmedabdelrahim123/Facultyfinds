const mongoose = require("mongoose");
var DB_URL = "mongodb://127.0.0.1:27017/E-Commerce";

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const usersSchema = new mongoose.Schema({
  _id: {
    type: "number",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  gender: {
    type: "string",
    required: true,
  },
  type: {
    type: "string",
    required: true,
  },
  orders: {
    type: "array",
    required: true,
  },
});
module.exports = mongoose.model('User', usersSchema);
