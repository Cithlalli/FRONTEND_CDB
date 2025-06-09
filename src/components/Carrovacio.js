import React from "react";
import { useNavigate } from "react-router-dom";
import "./CarritoVacio.css"; // Si deseas agregar estilos específicos

function CarritoVacio() {
  const navigate = useNavigate();

  return (
    <div className="carrito-vacio">
      <h1>Cesta de la compra</h1>
      <p>Tu cesta de compras está vacía</p>
      <button className="btn-volver" onClick={() => navigate("/productos")}>
        SEGUIR COMPRANDO
      </button>
    </div>
  );
}

export default CarritoVacio;

