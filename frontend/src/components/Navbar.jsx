import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// T1: Reusable Navbar component
const Navbar = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🍔 QuickBite
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        {customer && <Link to="/order">Order</Link>}
        <Link to="/admin">Admin</Link>
        {customer ? (
          <div className="navbar-user">
            <span>Hi, {customer.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <span className="navbar-hint">Login to order</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
