import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosClient.get("/orders/received");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosClient.patch(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="orders-container">
      <h2> Orders Received</h2>
      {orders.length === 0 && <p>No orders yet. When someone orders your Equipment, it will appear here! </p>}

      {orders.map((o) => (
        <div key={o._id} className="order-card">
          <p><strong>Equipment:</strong> {o.vehicle?.brand} {o.vehicle?.model}</p>
          <p><strong> Buyer:</strong> {o.buyer?.name} ({o.buyer?.phone})</p>
          <p><strong> Location:</strong> {o.buyer?.location?.city} {o.buyer?.location?.district} {o.buyer?.location?.state}</p>
          <p><strong> Offer:</strong> ₹{o.offerPrice?.toLocaleString()}</p>
          <p><strong> Message:</strong> {o.message || "No message"}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`order-status ${o.status}`}>
              {o.status === "pending" && " Pending"}
              {o.status === "confirmed" && "Confirmed"}
              {o.status === "rejected" && "Rejected"}
            </span>
          </p>
          {o.status === "pending" && (
            <div className="order-actions">
              <button onClick={() => updateStatus(o._id, "confirmed")}>
             Confirm Order
              </button>
              <button onClick={() => updateStatus(o._id, "rejected")}>
                 Reject Order
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
