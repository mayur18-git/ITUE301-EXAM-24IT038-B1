import React from "react";

// T1: Reusable RestaurantCard component
// Props: name, cuisine, rating, isOpen
const RestaurantCard = ({ name, cuisine, rating, isOpen }) => {
  return (
    <div className="restaurant-card">
      <div className="card-header">
        <h3>{name}</h3>
        {/* T1: Conditional rendering based on isOpen prop */}
        <span className={`status-badge ${isOpen ? "open" : "closed"}`}>
          {isOpen ? "Open Now" : "Closed"}
        </span>
      </div>
      <p className="cuisine">🍽️ {cuisine}</p>
      <p className="rating">⭐ {rating} / 5</p>
    </div>
  );
};

export default RestaurantCard;
