import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { useAuth } from "../auth/AdminAuthContext"; 

function Sidebar({ setVistaActual}) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    //navigate("/");
  };

  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h2 className="text-warning text-center mb-4">
        <i className="fa fa-cogs me-2"></i>Panel de Admin
      </h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-white"
            onClick={() => setVistaActual("dashboard")}
          >
            <i className="fa fa-home me-2"></i> Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-white"
            onClick={() => setVistaActual("productos")}
          >
            <i className="fa fa-box me-2"></i> Productos
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-white"
            onClick={() => setVistaActual("pedidos")}
          >
            <i className="fa fa-shopping-cart me-2"></i> Pedidos
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-white"
            onClick={() => setVistaActual("usuarios")}
          >
            <i className="fa fa-user-shield me-2"></i> Registro de Usuarios
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-white"
            onClick={() => setVistaActual("marcas")}
          >
            <i className="fa fa-tags me-2"></i> Marcas y Categorías
          </button>
        </li>
        {/* Nuevo botón para el Carrito de Imágenes */}
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-white"
            onClick={() => setVistaActual("carrito")}
          >
            <i className="fa fa-images me-2"></i> Carrito de Imágenes
          </button>
        </li>
        {/* Botón para cerrar la sesión de administrador*/}
        <li className="nav-item mb-2">
          <button
            className="btn btn-dark w-100 text-start text-danger"
            onClick={handleLogout}
          >
            <i className="fa fa-user me-2"></i> Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;