import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import"./all.css";


export default function SellVehicle() {
  const [form, setForm] = useState({
    type: "",
    brand: "",
    model: "",
    year: "",
    kmsDriven: "",
    fuelType: "",
    transmission: "",
    condition: "",
    location: "",
    price: "",
    negotiable: false,
    description: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });
      images.forEach((file, index) => {
        data.append("images", file);
      });

      await axiosClient.post("/vehicles", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Vehicle listed successfully!");
      setForm({
        type: "",
        brand: "",
        model: "",
        year: "",
        kmsDriven: "",
        fuelType: "",
        transmission: "",
        condition: "",
        location: "",
        price: "",
        negotiable: false,
        description: "",
      });
      setImages([]);
    } catch (err) {
      console.error(err);
      setMessage("Error listing vehicle.");
    }
  };

  return (
    <div className="sell-container">
      <h2> Sell Your Farming Equipment</h2>
      {message && <p className={message.includes("success") ? "success-message" : "error-message"}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Equipment Type *
          <input type="text" name="type" value={form.type} onChange={handleChange} placeholder="e.g., Car, Bike, Tractor" required />
        </label>

        <label>
          Brand *
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g., Toyota, Honda, Mahindra" required />
        </label>

        <label>
          Model *
          <input name="model" value={form.model} onChange={handleChange} placeholder="e.g., Fortuner, City, 575 DI" required />
        </label>

        <label>
          Year *
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="e.g., 2020"
            required
          />
        </label>

        <label>
          KM Driven *
          <input
            type="number"
            name="kmsDriven"
            value={form.kmsDriven}
            onChange={handleChange}
            placeholder="e.g., 25000"
            required
          />
        </label>

        <label>
          Fuel Type *
          <select
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol"> Petrol</option>
            <option value="diesel"> Diesel</option>
            <option value="electric"> Electric</option>
            <option value="cng"> CNG</option>
            <option value="None"> None</option>
          </select>
        </label>

        <label>
          Transmission *
          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            required
          >
            <option value="">Select Transmission</option>
            <option value="manual"> Manual</option>
            <option value="automatic"> Automatic</option>
          </select>
        </label>

        <label>
          Condition *
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="excellent"> Excellent</option>
            <option value="good"> Good</option>
            <option value="average"> Average</option>
          </select>
        </label>

        <label>
          Location *
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Mumbai, Maharashtra"
            required
          />
        </label>

        <label>
          Price (₹) *
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g., 500000"
            required
          />
        </label>

        <label style={{ flexDirection: "row", alignItems: "center" }}>
          <input
            type="checkbox"
            name="negotiable"
            checked={form.negotiable}
            onChange={handleChange}
          />
          <span> Price Negotiable</span>
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add any additional details about your Equipment..."
          />
        </label>

        <label>
           Equipment Photos (Upload 2 images)
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        </label>

        <button type="submit"> List Equipment for Sale</button>
      </form>
    </div>
  );
}