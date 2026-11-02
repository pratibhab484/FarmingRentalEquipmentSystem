import React from "react";
import { useAuth } from "../context/AuthContext";
import"./all.css";


export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to Farming Equipment Market </h1>
      <h3>Hello, {user?.name} </h3>

      <p>
        This platform allows you to easily <b>sell</b> and <b>buy</b> Equipment of all kinds —
        Cars, Bikes, Tractors, Trucks, and more. Whether you're a dealer or an individual,
        you can post your vehicle for sale or browse the listings from other users.
      </p>

      <h4> How it works:</h4>
      <ul>
        <li><b>Sell Equipment:</b> Post your Equipment with photos and price.</li>
        <li><b>Buy Equipment:</b> Browse listings and place your offer.</li>
        <li><b>Orders:</b> If someone places an order on your Equipment, you will see it here.</li>
        <li><b>Confirm/Pending:</b> Track the orders you've placed as a buyer.</li>
      </ul>

      <h4>Instant SMS Notification:</h4>
      <p>
        Whenever someone places an order on your Equipment, you will get an instant SMS
        with their contact details, offer price, and message — so you can contact them directly.
      </p>

      <p style={{ marginTop: "25px", fontStyle: "italic" }}>
        Happy Trading 💙 — Buy & Sell Equipment Safely and Smoothly!
      </p>
    </div>
  );
}
