const productController = require("../controller/productController");
const router = require("express").Router();

router.post("/", productController.addProduct);

module.exports = router;
