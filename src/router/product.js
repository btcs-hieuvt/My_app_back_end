const productController = require("../controller/productController");

const router = require("express").Router();

router.post("/", productController.addProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getAProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
