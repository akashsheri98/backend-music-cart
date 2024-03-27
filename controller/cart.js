const express = require("express");
const bcrypt = require("bcrypt");
const CartItem = require("../model/cart")
const jwt = require("jsonwebtoken");

const router = express.Router();

const addItemToCart = async (req, res) => {
    const { userId, product, quantity } = req.body;
  
    // Validation (ensure userId, product, and quantity are provided)
    if (!userId || !product || !quantity) {
      return res.status(400).json({ error: 'userId, product, and quantity are required' });
    }
  
    try {
      // Create a new cart item using the CartItem model
      const newItem = new CartItem({ userId, product, quantity });
  
      // Save the new item to the database
      await newItem.save();
  
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

module.exports = { addItemToCart , getCart };