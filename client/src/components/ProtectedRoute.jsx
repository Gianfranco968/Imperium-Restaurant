import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || (role !== 'admin' && role !== 'superadmin')) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;