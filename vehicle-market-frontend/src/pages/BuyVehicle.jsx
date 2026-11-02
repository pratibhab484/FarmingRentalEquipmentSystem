
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import"./all.css";

export default function BuyVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const BACKEND_URL = "http://localhost:5000";

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleOrder = async (vehicleId) => {
    const offerPrice = prompt("Enter your offer amount:");
    if (!offerPrice) return;
    const message = prompt("Add a message to the owner (optional):") || "";

    try {
      await axiosClient.post("/orders", {
        vehicleId,
        offerPrice: Number(offerPrice),
        message,
      });
      setMsg("Order placed successfully! Seller will get SMS.");
      setTimeout(() => setMsg(""), 5000);
    } catch (err) {
      console.error(err);
      setMsg("Error placing order.");
    }
  };

  if (loading) return <div className="loading-container">Loading vehicles... 🚗</div>;

  return (
    <div className="buy-container">
      <h2>🛒 Buy Equipment</h2>
      {msg && <p className="success-message">{msg}</p>}

      {vehicles.length === 0 && <div><p>No equipment available at the moment. Check back later! 📭</p></div>}

      <div className="vehicle-grid">
        {vehicles.map((v) => (
          <div key={v._id} className="vehicle-card">
            {v.images && v.images[0] && (
              <img
                src={`${BACKEND_URL}${v.images[0]}`}
                alt={v.model}
              />
            )}

            <div className="vehicle-card-content">
              <h3>
                {v.brand} {v.model} ({v.year})
              </h3>
              <p><strong>Type:</strong> {v.type}</p>
              <p><strong> Location:</strong> {v.location}</p>
              <p className="vehicle-price">₹{v.price?.toLocaleString()}</p>
              <p><strong>Condition:</strong> {v.condition} | <strong>KMs:</strong> {v.kmsDriven?.toLocaleString()}</p>
              <p><strong>Fuel:</strong> {v.fuelType} | <strong>Transmission:</strong> {v.transmission}</p>
              {v.negotiable && <span className="badge badge-negotiable"> Negotiable</span>}
              <button onClick={() => handleOrder(v._id)}> Place Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}