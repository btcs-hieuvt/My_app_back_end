const { Product } = require("../model/modelProduct");

const productController = {
  addProduct: async (req, res) => {
    try {
      const data = req.body;
      const product = new Product(data);
      const newproduct = await product.save();
      res.status(200).json(newproduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = productController;
