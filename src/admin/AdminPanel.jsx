import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ProductosAdmin from "./ProductosAdmin";
import PedidosAdmin from "./PedidosAdmin";
import RegistroUsuarios from "./RegistroUsuarios";
import MarcasAdmin from "./MarcasAdmin";
import AdminCarrito from "./AdminCarrito";
import "./AdminPanel.css";

function AdminPanel() {
  const [vistaActual, setVistaActual] = useState("dashboard");

  const renderizarVista = () => {
    switch (vistaActual) {
      case "dashboard":
        return <Dashboard />;
      case "productos":
        return <ProductosAdmin />;
      case "pedidos":
        return <PedidosAdmin />;
      case "usuarios":
        return <RegistroUsuarios />;
      case "marcas":
        return <MarcasAdmin />;
      case "carrito": 
        return <AdminCarrito />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-panel d-flex">
      {/* Sidebar */}
      <Sidebar setVistaActual={setVistaActual} />
      {/* Contenido dinámico */}
      <div className="admin-content flex-grow-1 p-4">{renderizarVista()}</div>
    </div>
  );
}

export default AdminPanel;