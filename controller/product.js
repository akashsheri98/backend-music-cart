const express = require("express");

const Product = require("../model/product");
/*const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage })*/
const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      productName,
      description,
      shortDescription,
      price,
      quantityAvailable,
      category,
      brand,
      rating,
      totalCustomerRev,
      color,
      imageUrl
    } = req.body;
    /*const imageUrl = req.file ? '/upload/' + req.file.filename : '';*/
    
    const product = new Product({
      productName,
      description,
      shortDescription,
      price,
      quantityAvailable,
      imageUrl,
      category,
      brand,
      rating,
      totalCustomerRev,
      color,
    });

    const savedProduct = await product.save();

    res.status(201).json({ message: "product saved", data: savedProduct });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products});
  } catch (err) {
    res.status(500).json(err);
  }
};



const filterProducts = async (req, res) => {
  try {
    const { keyword, category, brand, color, priceRange ,sort } = req.query;
    console.log(keyword,"keyword", category,"category", brand,"brand", color," color", priceRange,"priceRange", sort,"sort");
    // Construct the query based on received filters
    const query = {};

    if (keyword) {
      query.productName = { $regex: new RegExp(keyword, 'i') }; // Case-insensitive search
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = { $regex: new RegExp(brand, 'i') }; // Case-insensitive search
    }

    if (color) {
      query.color = color;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
      
    let sortQuery = {};

    if (sort === 'price-lowest') {
      sortQuery.price = 1; // Ascending order
    } else if (sort === 'price-highest') {
      sortQuery.price = -1; // Descending order
    } else if (sort === 'title-A-Z') {
      sortQuery.productName = 1; // Ascending order
    } else if (sort === 'title-Z-A') {
      sortQuery.productName = -1; // Descending order
    } else {
      sortQuery.price = 1; // Default sorting
    }
    // Fetch products based on the constructed query
    const products = await Product.find(query).sort(sortQuery);;

    // Send products as response
    res.status(200).json({ products });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingleProduct = async (req, res ) => {
  try {
    // Make a GET request to fetch the single product from the external API
    //recive product id
    const productId= req.params.productId 
   
    const product = await Product.findOne({ _id: productId });
    
    // Forward the response from the external server to the client
    res.json({product});
  } catch (error) {
    // If an error occurs during the request, forward the error to the client
    console.error('Error fetching single product:', error);
    res.status(error.response.status).json(error.response.data);
  }
};


module.exports = {
  addProduct, 
  getAllProducts,
  filterProducts, 
  getSingleProduct,
};
