const express = require("express");
const multer = require("multer");
const path = require("path");
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const upload = multer({ storage });

// POST /api/vehicles  (create vehicle)
router.post("/", auth, upload.array("images", 4), async (req, res) => {
  try {
    const {
      type,
      brand,
      model,
      year,
      kmsDriven,
      fuelType,
      transmission,
      condition,
      location,
      price,
      negotiable,
      description,
    } = req.body;

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const vehicle = await Vehicle.create({
      ownerId: req.user._id,
      type,
      brand,
      model,
      year,
      kmsDriven,
      fuelType,
      transmission,
      condition,
      location,
      price,
      negotiable: negotiable === "true" || negotiable === true,
      description,
      images: imagePaths,
    });

    res.status(201).json(vehicle);
  } catch (err) {
    console.error("Create vehicle error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/vehicles  (all available vehicles)
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ status: "available" })
      .sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    console.error("Get vehicles error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// (optional) GET /api/vehicles/my  (vehicles by logged-in user)
router.get("/my", auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ ownerId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(vehicles);
  } catch (err) {
    console.error("Get my vehicles error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
