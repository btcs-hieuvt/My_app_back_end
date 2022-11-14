const mongoose = require("mongoose");
const Product = require("../model/modelProduct");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

let Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
