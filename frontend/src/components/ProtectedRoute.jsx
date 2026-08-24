import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// T2: ProtectedRoute - checks token and redirects if not authenticated
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // If no token, redirect to home page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
