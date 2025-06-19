import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "./CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Carrito.css";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  // Calcular el total del carrito
  const total = carrito.reduce((acc, producto) => acc + producto.idProductoNavigation.precio * producto.cantidad, 0);

  // Estado para el archivo de factura
  const [factura, setFactura] = React.useState(null);

  // Manejar la subida de la factura
  const handleSubirFactura = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFactura(file);
      alert(`Factura "${file.name}" subida correctamente.`);
    }
  };

  // Si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio text-center py-5">
        <h2 className="mb-4">Tu carrito está vacío</h2>
        <p className="lead mb-4">Explora nuestros productos y encuentra algo especial.</p>
        <Link to="/productos" className="btn btn-primary btn-lg">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container carrito-page py-5">
      <h2 className="text-center mb-4">Cesta de la compra</h2>

      {/* Lista de productos */}
      <div className="carrito-lista mb-4">
        {carrito.map((producto) => (
          <div key={producto.idProducto} className="carrito-item p-3 mb-3">
            <div className="d-flex align-items-center">
              <img
                src={producto.idProductoNavigation.imagenUrl}
                alt={producto.idProductoNavigation.nombreProducto}
                className="carrito-imagen me-3"
              />
              <div className="carrito-info">
                <h5 className="mb-1">{producto.idProductoNavigation.nombreProducto}</h5>
                <p className="mb-1 text-muted">${producto.idProductoNavigation.precio}</p>
                <small>Cantidad: {producto.cantidad}</small>
              </div>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => eliminarDelCarrito(producto.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Total y acciones */}
      <div className="carrito-total text-center p-4 mb-4">
        <h4 className="mb-3">Total: ${total.toFixed(2)}</h4>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-warning" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
          <button className="btn btn-success">Pagar Ahora</button>
        </div>
      </div>

      {/* Opciones de bancos */}
      <div className="bancos-section text-center p-4 mb-4">
        <h5 className="mb-4">Métodos de pago aceptados</h5>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <img src="/img/banamex.png" alt="Banamex" className="banco-logo" />
          <img src="/img/bbva.png" alt="BBVA" className="banco-logo" />
          <img src="/img/santander.png" alt="Santander" className="banco-logo" />
          <img src="/img/hsbc.png" alt="HSBC" className="banco-logo" />
        </div>
      </div>

      {/* Subir factura */}
      <div className="factura-section p-4">
        <h5 className="text-center mb-3">Subir Factura</h5>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleSubirFactura}
            accept=".pdf,.jpg,.png"
          />
        </div>
        <button className="btn btn-primary w-100" disabled={!factura}>
          Generar Factura
        </button>
      </div>
       {/* Agregar aquí */}
    <div className="text-center mt-4">
      <Link to="/historial-compras" className="btn btn-outline-primary me-2">
        Ver Historial
      </Link>
      <Link to="/perfil" className="btn btn-outline-success">
        Ver Perfil
      </Link>
    </div>
    </div>
  );
}

export default Carrito;