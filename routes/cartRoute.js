const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart");

router.post("/addtocart" , cartController.addItemToCart);
router.get("/:userId" , cartController.getCart);
router.post("/update" , cartController.updateQuantity)
router.delete("/clear/:userId" , cartController.clearCart);
/*router.delete("/delete" , cartController.deleteCartItem);
router.get("/total" , cartController.getCartTotal);*/

module.exports = router;