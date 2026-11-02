import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import "./auth.css";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    district: "",
    state: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        location: {
          city: form.city,
          district: form.district,
          state: form.state,
        },
      };

      const res = await axiosClient.post("/auth/register", payload);
      login(res.data.user, res.data.token);
      navigate("/buy");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Left Side - Hero Section */}
      <div className="auth-left">
        <div className="auth-overlay">
          <div className="auth-brand">
            <div className="brand-icon">🌱
            </div>
            <h1>Join EquipmentHub</h1>
            <p>Start Your Journey Today!</p>
          </div>
          
          <div className="auth-features">
            <div className="feature-item">
              <div className="icon">

              </div>
              <div>
                <h3>Quick Registration</h3>
                <p>Get started in less than 2 minutes</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon"></div>
              <div>
                <h3>Sell Fast</h3>
                <p>List your vehicle and connect with buyers instantly</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon"></div>
              <div>
                <h3>Smart Finding</h3>
                <p>Find exactly what you're looking for easily</p>
              </div>
            </div>
          </div>

          <div className="auth-stats">
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Verified</p>
            </div>
            <div className="stat-item">
              <h3>Free</h3>
              <p>Listing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="auth-right">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join thousands of satisfied users</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}

            <label>
              Full Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
              />
            </label>

            <label>
              Phone Number
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </label>

            <h4> Location Details (Optional)</h4>
            
            <label>
              City
              <input 
                name="city" 
                value={form.city} 
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </label>

            <label>
              District
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Enter your district"
              />
            </label>

            <label>
              State
              <input 
                name="state" 
                value={form.state} 
                onChange={handleChange}
                placeholder="Enter your state"
              />
            </label>

            <button type="submit">Create Account</button>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p>
              Already have an account? <Link to="/login">Login Here</Link>
            </p>
          </form>

          <div className="auth-info">
            <p> No hidden fees or charges</p>
            <p> Your data is safe with us</p>
            <p>Start buying or selling instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
}