// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("adminToken");

//   return token ? children : <Navigate to="/login" replace />;
// }
// src/components/AdminProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem('adminToken');
//   const user = JSON.parse(localStorage.getItem('adminUser') || 'null');

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== 'ADMIN') {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser') || 'null');

  // Redirect if no token or user
  if (!token || !user) return <Navigate to="/login" replace />;

  // Redirect if user is not admin
  if (user.role !== 'ADMIN') return <Navigate to="/login" replace />;

  // Otherwise, render protected content
  return children;
}
