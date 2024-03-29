const mongoose = require('mongoose');

// Define a schema for cart items
const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId:{
    type:String,
    required:true
  },
  product: {
    type: [],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Create a model based on the schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;