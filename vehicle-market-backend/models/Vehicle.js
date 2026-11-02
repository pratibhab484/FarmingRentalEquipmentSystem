const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // car / bike / tractor / truck / other
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: Number,
    kmsDriven: Number,
    fuelType: String,
    transmission: String,
    condition: String,
    location: String,
    price: Number,
    negotiable: Boolean,
    description: String,
    images: [String], // file paths or URLs
    status: { type: String, default: "available" }, // available / sold
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
