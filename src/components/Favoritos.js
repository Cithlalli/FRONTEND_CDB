import React, { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos, agregarAlCarrito, toggleFavorito } = useContext(CarritoContext);
  const [mostrarDetalles, setMostrarDetalles] = useState(null); // Estado para el modal
  const navigate = useNavigate();
  //console.log(favoritos);
  if (favoritos.length === 0) {
    return (
      <div className="favoritos-vacio">
        <img
          src="/img/empty-favorites.png"
          alt="Sin favoritos"
          className="img-vacio"
        />
        <h2>No tienes productos en favoritos</h2>
        <p>¡Empieza a explorar y guarda tus favoritos aquí!</p>
        <button className="btn-explorar" onClick={() => navigate("/productos")}>
          Seguir explorando
        </button>
      </div>
    );
  }

  return (
    <div className="favoritos-page">
      <h2>Favoritos</h2>
      <div className="productos-grid">
        {favoritos.map((producto) => (
          <div className="producto-card" key={producto.idProducto}>
            {/* Ícono de favorito */}
            <div
              className="favorito-icon"
              onClick={() => toggleFavorito(producto)}
            >
              {favoritos.some((fav) => fav.idProducto === producto.idProducto) ? "❤️" : "🤍"}
            </div>
            <img src={producto.idProductoNavigation.imagenUrl} alt={producto.idProductoNavigation.nombreProducto} />
            <h3>{producto.idProductoNavigation.nombreProducto}</h3>
            <p>${producto.idProductoNavigation.precio}</p>
            <div className="acciones">
              <button onClick={() => setMostrarDetalles(producto)}>
                Ver más
              </button>
              <button onClick={() => agregarAlCarrito(producto)}>
                Añadir al carrito
              </button>
              <button onClick={() => toggleFavorito(producto)}>
                Quitar de favoritos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {mostrarDetalles && (
        <div className="modal">
          <div className="modal-content">
            <h2>{mostrarDetalles.idProductoNavigation.nombreProducto}</h2>
            <p>{mostrarDetalles.idProductoNavigation.descripcion}</p>
            <button onClick={() => setMostrarDetalles(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favoritos;
