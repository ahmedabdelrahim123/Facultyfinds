const config = require("config");
const mongoose = require("mongoose");
var DB_URL = config.get("mongo.uri");
const mongoOptions = config.get("mongo.options");
mongoose.connect(DB_URL, mongoOptions);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
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
    required: true,
  },
});
module.exports = mongoose.model("User", usersSchema);
