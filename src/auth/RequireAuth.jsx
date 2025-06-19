import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AdminAuthContext";

const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    //console.log("user:", user);
    //console.log("loading:", loading);

    if (loading) return <p style={{ textAlign: "center" }}>Verificando sesión...</p>;

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;