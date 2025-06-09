import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();
  
  // Si no hay usuario logueado, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra las rutas anidadas
  return <Outlet />;
};

export default ProtectedRoute;