import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedAdmin = ({ children }) => {
  const { user, loading } = useAuth();


   if (loading) {
    return <div className="spinner">Cargando...</div>; 
  }

  if (!user || user.rol!=="admin") {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdmin;