const { Category } = require("../model/modelCategory");
const { Product } = require("../model/modelProduct");

const categoryController = {
  addCategory: async (req, res) => {
    try {
      const data = req.body;
      const category = new Category(data);
      const newCategory = await category.save();
      res.status(200).json("add category successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getACategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
      await category.updateOne({ $set: req.body });
      res.status(200).json("updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Product.updateMany(
        { categoryId: req.params.id },
        { categoryId: null }
      );
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted succsessfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = { categoryController };
