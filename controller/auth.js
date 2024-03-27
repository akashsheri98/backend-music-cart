const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

const register = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }


    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      username,
      phone,
      password: hashedPassword,
    });

    // Save user to the database
    const userResponse = await newUser.save();
    console.log(userResponse._id);

    const token = await jwt.sign(
      { userId: userResponse._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      name: username,
      userid: userResponse._id,
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email   || !password ) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
  
      // Find user by email
      const userDetails = await User.findOne({ email });
      if (!userDetails) {
        return res.status(401).json({ message: "Invalid email ,phone number or password" });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(
        password,
        userDetails.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email ,phone number or password" });
      }
  
      // Create and assign a token
      const token = jwt.sign({ userId: userDetails._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true , secure:false });
     
      
      console.log(token);
      console.log(userDetails.email);
      
      // You might want to exclude sending hashed password in the response
      //const { password: _, ...userData } = userDetails.toObject();
  
      return res.status(200).json({
        message: "Logged in Successfully",
        token,
        name: userDetails.username,
        userid: userDetails._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { register, login };