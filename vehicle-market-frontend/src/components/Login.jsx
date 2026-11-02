import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/buy");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Left Side - Hero Section */}
      <div className="auth-left">
        <div className="auth-overlay">
          <div className="auth-brand">
            <div className="brand-icon">
                🌱
            </div>
            <h1>EquipmentHub</h1>
            <p>Your Trusted Farming Equipment Marketplace</p>
          </div>
          
          <div className="auth-features">
            <div className="feature-item">
              <div className="icon"></div>
              <div>
                <h3>Secure Buying Experience</h3>
                <p>100% safe and verified buyers & sellers</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon"></div>
              <div>
                <h3>Wide Network</h3>
                <p>Connect with thousands of farming equipment enthusiasts</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="icon"></div>
              <div>
                <h3>Best Deals</h3>
                <p>Find the perfect equipment at the best price</p>
              </div>
            </div>
          </div>

          <div className="auth-stats">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>1200+</h3>
              <p>Equipment Sold</p>
            </div>
            <div className="stat-item">
              <h3>4.8</h3>
              <p>User Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Welcome Back!</h2>
            <p>Login to access your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}

            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit">Login to Account</button>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p>
              Don't have an account? <Link to="/register">Create Account</Link>
            </p>
          </form>

          <div className="auth-info">
            <p>Buy & Sell Cars, Bikes, Tractors ,all Equipment & More</p>
            <p> Instant SMS Notifications</p>
            <p> Easy Order Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}