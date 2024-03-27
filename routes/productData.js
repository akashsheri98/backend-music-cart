const express = require("express");
const router = express.Router();

const productController = require("../controller/product");

//add product
router.post("/create" , productController.addProduct);

//get all products
router.get("/getAll" , productController.getAllProducts);
router.get("/filter" , productController.filterProducts);
router.get("/:productId" , productController.getSingleProduct);

module.exports = router