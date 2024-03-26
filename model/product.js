const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  description: { 
    type: String 
},
  shortDescription: { 
    type: String
 }, // Add short description field
  price: { 
    type: Number
  
},
  quantityAvailable: { 
    type: Boolean, 
    default: true
 },
    
  imageUrl: { 
    type: String 
},
  category: { 
    type: String 
},
brand:{
  type: String
},
totalCustomerRev: {
  type: Number
},
rating:{
  type: Number
},
color:{
  type: String
}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
