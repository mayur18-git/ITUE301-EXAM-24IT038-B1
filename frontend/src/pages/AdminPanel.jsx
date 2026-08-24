import React from "react";

// T2: AdminPanel - this component is lazy loaded in App.jsx using React.lazy()
const AdminPanel = () => {
  return (
    <div className="page-container">
      <div className="card center-card">
        <h1>⚙️ Admin Panel</h1>
        <p>This page is loaded using <strong>React.lazy()</strong> and <strong>Suspense</strong>.</p>
        <p>It only loads when the user navigates to <code>/admin</code>.</p>
        <div className="admin-info">
          <div className="admin-stat">
            <span>Lazy Loading</span>
            <strong>✅ Active</strong>
          </div>
          <div className="admin-stat">
            <span>Code Splitting</span>
            <strong>✅ Enabled</strong>
          </div>
          <div className="admin-stat">
            <span>Suspense Fallback</span>
            <strong>✅ Configured</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
