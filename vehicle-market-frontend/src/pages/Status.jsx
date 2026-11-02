import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import"./all.css";


export default function Status() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosClient.get("/orders/placed");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const pending = orders.filter((o) => o.status === "pending");
  const confirmed = orders.filter((o) => o.status === "confirmed");

  return (
    <div className="status-container">
      <h2> My Orders Status</h2>

      <h3> Pending Orders</h3>
      {pending.length === 0 && <p>No pending orders.</p>}
      {pending.map((o) => (
        <div key={o._id} className="status-card pending-order">
          <p>
             {o.vehicle?.brand} {o.vehicle?.model} - Offer ₹{o.offerPrice?.toLocaleString()} (Pending)
          </p>
        </div>
      ))}

      <h3> Confirmed Orders</h3>
      {confirmed.length === 0 && <p>No confirmed orders yet.</p>}
      {confirmed.map((o) => (
        <div key={o._id} className="status-card confirmed-order">
          <p>
            {o.vehicle?.brand} {o.vehicle?.model} - Offer ₹{o.offerPrice?.toLocaleString()} (Confirmed) 🎉
          </p>
        </div>
      ))}
    </div>
  );
}