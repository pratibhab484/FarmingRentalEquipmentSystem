import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="vm-header">
      <div className="vm-left">
        <span className="vm-logo"> 🌱Farming Equipment Market</span>
      </div>

      <nav className="vm-nav">
        <NavLink to="/" className="vm-link">
          Home
        </NavLink>
        <NavLink to="/sell" className="vm-link">
          Sell Equipment
        </NavLink>
        <NavLink to="/buy" className="vm-link">
          Buy Equipment
        </NavLink>
        <NavLink to="/orders" className="vm-link">
          Orders (Received)
        </NavLink>
        <NavLink to="/status" className="vm-link">
          Confirm / Pending
        </NavLink>
      </nav>

      <div className="vm-right">
        {user && <span className="vm-user">Hi, {user.name}</span>}
        <button className="vm-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
