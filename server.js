const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();

const emailRoutes = require("./routes/emailRoutes"); // ✅ CONNECT ROUTE

app.use(cors());
app.use(express.json());

app.use("/", emailRoutes); // ✅ USE ROUTE

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  res.json(order);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});