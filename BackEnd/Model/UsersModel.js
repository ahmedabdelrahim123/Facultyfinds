const mongoose = require("mongoose");
var DB_URL = "mongodb+srv://samarsamy484:samar@cluster0.yvo61fo.mongodb.net/E-Commerce";

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const usersSchema = new mongoose.Schema({
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
    // required: true,
  },
});
module.exports = mongoose.model('User', usersSchema);
