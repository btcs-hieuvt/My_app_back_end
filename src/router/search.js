const productController = require("../controller/productController");

const router = require("express").Router();

router.get("/", productController.searchProduct);

module.exports = router;
