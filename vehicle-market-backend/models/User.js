const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: String,
  district: String,
  state: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true },
    location: locationSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
