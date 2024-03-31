require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
/*const cookieParser = require("cookie-parser");*/
const productRouter = require("./routes/productData");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
/*const taskRoutes = require("./routes/task");
const analyticsRoutes = require("./routes/analytics");*/
//create a server
const app = express();

app.use(express.json());
//app.use(cookieParser());
//for testing purposes only, should be removed in production.
app.use(cors());

//database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("--------DB CONNECTED--------"))
  .catch((error) => console.log("Failed to connect", error));

//routes
app.use("/api/v1/product" ,productRouter);
app.use("/api/v1/auth" ,authRouter);
app.use("/api/v1/cart" ,cartRouter);
app.use("/api/v1/order" ,orderRouter);
/*app.use("/api/v1/task" ,taskRoutes);
app.use("/api/v1/analytics" ,analyticsRoutes);*/

app.get("/health", (req, res) => {
  res.json({
    service: "music-cart server",
    status: "Active",
    time: new Date(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("____________________________");
  console.log(`| server is running at ${PORT}|`);
});
