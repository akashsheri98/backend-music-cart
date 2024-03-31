const express = require("express");
const bcrypt = require("bcrypt");
const Order = require("../model/order");
const jwt = require("jsonwebtoken");
 
const router = express.Router();

const placeOrder =  async (req, res) => {
    try {
      // Extract data from the request body
      const { 
        cartItems,
        totalAmount,
        cartTotalAmount,
        userId,
        userName,
        paymentMethod,
        additionalInfo } = req.body;
  
      // Create a new order instance
      const order = new Order({
        userId,
        address : additionalInfo,
        userName,
        paymentMethod,
        products: cartItems,
        totalAmount,
        cartTotalAmount
      });
  
      // Save the order to the database
      const savedOrder = await order.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'Order placed successfully', savedOrder: savedOrder });
    } catch (error) {
      // If there's an error, respond with an error message
      res.status(500).json({ error: 'Failed to place order', errormessage: error.message });
    }
  };

  const getInvoice = async (req, res) => {
    try {
      const { userId } = req.body;
 
      // Query the database for invoices associated with the provided user ID
      const invoices = await Order.find({ userId }).sort({ createdAt: -1 });

      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invoices', message: error.message });
    }
  };
  
  module.exports = { placeOrder, getInvoice };