const express = require("express");
const bcrypt = require("bcrypt");
const CartItem = require("../model/cart")
const jwt = require("jsonwebtoken");

const router = express.Router();

const addItemToCart = async (req, res) => {
    const { userId, product,productId, quantity } = req.body;
    console.log("p",product)
    // Validation (ensure userId, product, and quantity are provided)
    if (!userId || !product || !quantity  ) {
      return res.status(400).json({ error: 'userId, product, and quantity are required' });
    }
  
    try {
      // Create a new cart item using the CartItem model
      const newItem = new CartItem({ userId, product,  quantity , productId : product._id});
  
      // Save the new item to the database
      await newItem.save();
      console.log("newItem",newItem)
      // Respond with success message and new cart item
      res.status(200).json({ message: 'Item added to cart successfully', item: newItem });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getCart = async (req, res) => {
    const userId = req.params.userId;
  
    // Retrieve cart products for the specified userId
    //const userCart = await CartItem.find({ userId }).select('-__v').populate('product', 'title price');
    
    const userCart = await CartItem.find({ userId });
    // Respond with the user's cart products
    res.status(200).json(userCart);
  }

  const updateQuantity = async (req, res) => {
    try {
      const { userId, quantity, productId } = req.body;
  
      // Check if required fields are present
      if (!userId || !quantity || !productId) {
        return res.status(400).json({ success: false, message: "Bad Request" });
      }
  
      // Find the cart item by userId and productId
      let cartItem = await CartItem.findOne({ productId} );
  
      // If cart item doesn't exist, return error
      if (!cartItem) {
        
        return res.status(404).json({ success: false, message: "Cart item not found" });
        
      }
  
      // Update the quantity of existing cart item
      cartItem.quantity = quantity;
  
      // Save the updated cart item
      await cartItem.save();
  
      // Return success response
      return res.status(200).json({ success: true, message: "Cart quantity updated successfully" });
  
    } catch (error) {
      // Return error response
      console.error("Error updating cart quantity:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  const clearCart = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Delete all cart items for the specified userId
      await CartItem.deleteMany({ userId });
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  
  
  

module.exports = { addItemToCart , getCart ,updateQuantity , clearCart};