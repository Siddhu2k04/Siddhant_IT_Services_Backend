const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_live_SKnAAXsoSOko7w",
  key_secret: "T2cmWm6h9aPoHs3ZkllhstZM", // 🔴 secret here only
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    res.json(order);
  } catch (error) {
    res.status(500).send("Error creating order");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/", (req, res) => {
    res.send("Server is running successfully 🚀");
});