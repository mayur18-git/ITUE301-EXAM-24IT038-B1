import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

// T2: HomePage with login form
const HomePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, customer } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Login failed");
        return;
      }

      // T2: Save customer and token via AuthContext
      login(data.customer, data.token);
      setIsError(false);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/restaurants"), 1000);
    } catch {
      setIsError(true);
      setMessage("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="hero">
        <h1>🍔 Welcome to QuickBite</h1>
        <p>Order food from the best restaurants near you.</p>
      </div>

      {customer ? (
        <div className="card center-card">
          <p>You are logged in as <strong>{customer.name}</strong></p>
          <button className="btn-primary" onClick={() => navigate("/restaurants")}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="card center-card">
          <h2>Login to Get Started</h2>
          <form onSubmit={handleLogin} className="form">
            <div className="form-group">
              <label>Name (optional)</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {message && (
            <p className={isError ? "msg-error" : "msg-success"}>{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
