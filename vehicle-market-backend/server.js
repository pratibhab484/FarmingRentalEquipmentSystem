const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();


const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// static for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Vehicle Market API is running 🚗");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
