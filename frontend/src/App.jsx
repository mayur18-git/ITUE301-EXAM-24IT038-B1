import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import OrderPage from "./pages/OrderPage";

// T2: Lazy load AdminPanel - only downloaded when user visits /admin
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

const App = () => {
  return (
    // T2: AuthProvider wraps everything so all components can access auth state
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        {/* T2: Suspense provides fallback while AdminPanel is being loaded */}
        <Suspense fallback={<div className="loading-text">Loading Admin Panel...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />

            {/* T2: /order is a protected route - redirects to / if not logged in */}
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />

            {/* T2: /admin uses lazy loaded AdminPanel */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
