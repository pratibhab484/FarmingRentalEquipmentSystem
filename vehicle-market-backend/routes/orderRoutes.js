const express = require("express");
const Order = require("../models/Order");
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/authMiddleware");
const { sendSms } = require("../services/smsService");

const router = express.Router();

// POST /api/orders  (place order)
router.post("/", auth, async (req, res) => {
  try {
    const { vehicleId, offerPrice, message } = req.body;

    const vehicle = await Vehicle.findById(vehicleId).populate("ownerId");
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const seller = vehicle.ownerId;
    const buyer = req.user;

    const order = await Order.create({
      vehicleId: vehicle._id,
      sellerId: seller._id,
      buyerId: buyer._id,
      offerPrice,
      message,
    });

    // SMS to seller
    const smsText = `
New order on Vehicle Market:
Buyer: ${buyer.name} (${buyer.phone})
Location: ${buyer.location?.city || ""} ${buyer.location?.district || ""} ${buyer.location?.state || ""}
Vehicle: ${vehicle.brand} ${vehicle.model} (${vehicle.year}) @ ₹${vehicle.price}
Offer: ₹${offerPrice}
Message: ${message || "No message"}
    `;

    await sendSms({
      numbers: seller.phone,
      message: smsText,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders/received  (for seller: orders on my vehicles)
router.get("/received", auth, async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .populate("vehicleId")
      .populate("buyerId", "name phone location")
      .sort({ createdAt: -1 });

    const formatted = orders.map((o) => ({
      _id: o._id,
      offerPrice: o.offerPrice,
      message: o.message,
      status: o.status,
      createdAt: o.createdAt,
      vehicle: o.vehicleId,
      buyer: o.buyerId,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Get received orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders/placed  (for buyer: orders I have placed)
router.get("/placed", auth, async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id })
      .populate("vehicleId")
      .sort({ createdAt: -1 });

    const formatted = orders.map((o) => ({
      _id: o._id,
      offerPrice: o.offerPrice,
      message: o.message,
      status: o.status,
      createdAt: o.createdAt,
      vehicle: o.vehicleId,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Get placed orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/orders/:id/status  (seller confirm/reject)
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body; // "confirmed" or "rejected"
    const order = await Order.findById(req.params.id)
      .populate("vehicleId")
      .populate("buyerId", "name phone");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // only seller can update
    if (order.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.status = status;
    await order.save();

    // SMS to buyer if confirmed / rejected
    const vehicle = order.vehicleId;
    const buyer = order.buyerId;

    let smsText;
    if (status === "confirmed") {
      smsText = `
Your order is CONFIRMED ✅
Vehicle: ${vehicle.brand} ${vehicle.model} (${vehicle.year})
Offer: ₹${order.offerPrice}
Seller contact: ${req.user.name} (${req.user.phone})
      `;
    } else if (status === "rejected") {
      smsText = `
Your order is REJECTED ❌
Vehicle: ${vehicle.brand} ${vehicle.model} (${vehicle.year})
Offer: ₹${order.offerPrice}
      `;
    }

    if (smsText) {
      await sendSms({
        numbers: buyer.phone,
        message: smsText,
      });
    }

    res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
