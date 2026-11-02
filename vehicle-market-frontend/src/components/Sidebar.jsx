import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Vehicle Market</h2>
        {user && <p className="sidebar-user">Hi, {user.name}</p>}
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">
          Home
        </NavLink>

        <NavLink to="/sell" className="sidebar-link">
          Sell Vehicle
        </NavLink>

        <NavLink to="/buy" className="sidebar-link">
          Buy Vehicle
        </NavLink>

        <NavLink to="/orders" className="sidebar-link">
          Orders (Received)
        </NavLink>

        <NavLink to="/status" className="sidebar-link">
          Confirm / Pending
        </NavLink>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
