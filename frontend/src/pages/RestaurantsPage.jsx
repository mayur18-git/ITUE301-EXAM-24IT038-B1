import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

const API_URL = import.meta.env.VITE_API_URL;

// T4: RestaurantsPage - fetches from API, shows loading/error/data, client-side search
const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]); // All fetched restaurants
  const [searchQuery, setSearchQuery] = useState("");  // Search input value
  const [loading, setLoading] = useState(true);        // T4: Loading state
  const [error, setError] = useState("");              // T4: Error state

  // T4: useEffect - API call happens once when component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${API_URL}/restaurants`);
        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        setRestaurants(data.data); // Store all restaurants in state
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array = runs only on mount

  // T4: Client-side filtering - NO new API call, just filters existing state
  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // T4: Loading state
  if (loading) return <div className="page-container"><p className="loading-text">Loading restaurants...</p></div>;

  // T4: Error state
  if (error) return <div className="page-container"><p className="msg-error">{error}</p></div>;

  return (
    <div className="page-container">
      <h1>🍽️ Restaurants</h1>

      {/* T4: Search input - filters client-side, does NOT call API again */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or cuisine..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="msg-error">No restaurants found for "{searchQuery}"</p>
      ) : (
        <div className="cards-grid">
          {/* T1: Render RestaurantCard for each restaurant from API */}
          {filtered.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              isOpen={restaurant.isOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
