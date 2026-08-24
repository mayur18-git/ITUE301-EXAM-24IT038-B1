import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

// T2: OrderPage - protected, controlled form with live preview
const OrderPage = () => {
  const { token } = useAuth();

  // T2: Controlled form state - every field is stored in React state
  const [form, setForm] = useState({
    restaurantId: "",
    itemName: "",
    quantity: 1,
    deliveryAddress: "",
    totalAmount: 0,
  });

  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch restaurants to populate the dropdown
  useEffect(() => {
    fetch(`${API_URL}/restaurants`)
      .then((r) => r.json())
      .then((data) => setRestaurants(data.data || []))
      .catch(() => {});
  }, []);

  // T2: Generic onChange handler updates the correct field in state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // T3: Send JWT token
        },
        body: JSON.stringify({
          restaurantId: form.restaurantId,
          items: [{ name: form.itemName, quantity: Number(form.quantity) }],
          totalAmount: Number(form.totalAmount),
          deliveryAddress: form.deliveryAddress,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Failed to place order");
        return;
      }

      setIsError(false);
      setMessage("Order placed successfully! 🎉");
      // Reset form after success
      setForm({ restaurantId: "", itemName: "", quantity: 1, deliveryAddress: "", totalAmount: 0 });
    } catch {
      setIsError(true);
      setMessage("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // Find selected restaurant name for live preview
  const selectedRestaurant = restaurants.find((r) => r._id === form.restaurantId);

  return (
    <div className="page-container order-layout">
      <div className="card">
        <h2>🛒 Place an Order</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Restaurant</label>
            {/* T2: Controlled select - value tied to state */}
            <select name="restaurantId" value={form.restaurantId} onChange={handleChange} required>
              <option value="">-- Select Restaurant --</option>
              {restaurants.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name} ({r.cuisine})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="itemName"
              placeholder="e.g. Butter Chicken"
              value={form.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Your full address"
              value={form.deliveryAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Total Amount (₹)</label>
            <input
              type="number"
              name="totalAmount"
              min="0"
              placeholder="0"
              value={form.totalAmount}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {message && (
          <p className={isError ? "msg-error" : "msg-success"}>{message}</p>
        )}
      </div>

      {/* T2: Live preview - updates instantly as user types */}
      <div className="card preview-card">
        <h2>📋 Order Preview</h2>
        <div className="preview-row">
          <span>Restaurant:</span>
          <strong>{selectedRestaurant ? selectedRestaurant.name : "—"}</strong>
        </div>
        <div className="preview-row">
          <span>Item:</span>
          <strong>{form.itemName || "—"}</strong>
        </div>
        <div className="preview-row">
          <span>Quantity:</span>
          <strong>{form.quantity}</strong>
        </div>
        <div className="preview-row">
          <span>Delivery Address:</span>
          <strong>{form.deliveryAddress || "—"}</strong>
        </div>
        <div className="preview-row total">
          <span>Total Amount:</span>
          <strong>₹{form.totalAmount}</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
