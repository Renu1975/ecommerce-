const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const connectDB = require("./config.js/db");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const parseOrigins = (value) =>
  value
    ? value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://ecommerce-2vah.vercel.app",
  "https://ecommerce-nu-eight-38.vercel.app",
  ...parseOrigins(process.env.CLIENT_URL),
  ...parseOrigins(process.env.FRONTEND_URL),
  ...parseOrigins(process.env.CORS_ORIGINS),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "StyLoria API is running" });
});

app.use("/", authRoutes);

const getRazorpay = () => {
  if (!process.env.KEY_ID || !process.env.KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
};

app.get("/razorpay-key", (req, res) => {
  if (!process.env.KEY_ID) {
    return res.status(500).json({
      success: false,
      message: "Razorpay key is not configured",
    });
  }

  res.json({ success: true, key: process.env.KEY_ID });
});

app.post("/create-order", async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const razorpay = getRazorpay();

    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: "Razorpay credentials are not configured",
      });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid amount is required",
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to create payment order",
    });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment verification details are incomplete",
    });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET || "")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }

  res.json({ success: true, message: "Payment verified successfully" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
