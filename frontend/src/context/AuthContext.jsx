import React, { createContext, useContext, useState } from "react";

// T2: Create context for global auth state
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage so auth persists on page refresh
  const [customer, setCustomer] = useState(() => {
    const stored = localStorage.getItem("customer");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // T2: login() - saves customer and token to state and localStorage
  const login = (customerData, jwtToken) => {
    setCustomer(customerData);
    setToken(jwtToken);
    localStorage.setItem("customer", JSON.stringify(customerData));
    localStorage.setItem("token", jwtToken);
  };

  // T2: logout() - clears state and localStorage
  const logout = () => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem("customer");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ customer, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useAuth = () => useContext(AuthContext);
