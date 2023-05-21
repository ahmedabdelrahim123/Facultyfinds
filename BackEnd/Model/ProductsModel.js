const mongoose = require("mongoose");
var DB_URL = "mongodb+srv://samarsamy484:samar@cluster0.yvo61fo.mongodb.net/E-Commerce";

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
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
    type: "number",
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

