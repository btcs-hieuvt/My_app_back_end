const { categoryController } = require("../controller/categoryController");

const router = require("express").Router();
// add category
router.post("/", categoryController.addCategory);
// get all categories
router.get("/", categoryController.getAllCategory);
//get a category
router.get("/:id", categoryController.getACategory);
// update category
router.put("/:id", categoryController.updateCategory);
//delete category
router.delete("/:id", categoryController.deleteCategory);
module.exports = router;
