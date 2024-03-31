const express = require("express");
const router = express.Router();

const orderController = require("../controller/order");

router.post("/checkout" , orderController.placeOrder);
router.post("/getInvoice" , orderController.getInvoice);
module.exports = router;