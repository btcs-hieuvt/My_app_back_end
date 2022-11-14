const mongoose = require("mongoose");
const Category = require("../model/modelCategory");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  listImage: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  priceSale: {
    type: Number,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

let Product = mongoose.model("Product", productSchema);

module.exports = { Product };
