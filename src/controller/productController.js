const { Category } = require("../model/modelCategory");
const { Product } = require("../model/modelProduct");

const productController = {
  addProduct: async (req, res) => {
    try {
      const data = req.body;
      const product = new Product(data);
      const newproduct = await product.save();
      if (data.categoryId) {
        const category = Category.findById(data.categoryId);
        await category.updateOne({ $push: { products: newproduct._id } });
      }
      res.status(200).json("add product successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId).populate("categoryId");
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      await Category.updateMany(
        { products: productId },
        { $pull: { products: productId } }
      );
      await Product.findByIdAndDelete(productId);
      res.status(200).json("Deleted succsessfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  a: async (req, res) => {
    const k = req.query.k;
    res.status(200).json(k);
  },

  searchProduct: async (req, res) => {
    try {
      const k = req.query.k;

      // Tạo biểu thức chính quy không phân biệt chữ hoa chữ thường
      const regex = new RegExp(k, "i");

      // Tìm kiếm sản phẩm theo từ khóa
      const searchResult = await Product.find({
        $or: [
          { productName: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      });

      res.status(200).json(searchResult);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = productController;
