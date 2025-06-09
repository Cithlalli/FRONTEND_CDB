import React, { useState, useContext } from "react";
import "./App.css";
import { CarritoContext } from "./components/CarritoContext";

function Maquillaje() {
  const productos = [
    {
      id: 1,
      nombre: "Labial Mate",
      precio: 129.99,
      categoria: "Labios",
      imagen: "/img/labial.png",
      detalles: "Labial mate de larga duración en tonos intensos.",
    },
    {
      id: 2,
      nombre: "Delineador Líquido",
      precio: 99.99,
      categoria: "Ojos",
      imagen: "/img/delineador.png",
      detalles: "Delineador líquido de punta fina para mayor precisión.",
    },
    {
      id: 3,
      nombre: "Base de Maquillaje",
      precio: 199.99,
      categoria: "Rostro",
      imagen: "/img/base.png",
      detalles: "Base líquida para un acabado natural y uniforme.",
    },
    {
      id: 4,
      nombre: "Paleta de Sombras",
      precio: 299.99,
      categoria: "Ojos",
      imagen: "/img/sombras.png",
      detalles: "Paleta con 12 tonos de sombras altamente pigmentadas.",
    },
  ];

  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext);
  const [mostrarDetalles, setMostrarDetalles] = useState(null);

  return (
    <div className="maquillaje-page">
      <header>
        <h1>Maquillaje</h1>
        <p>Descubre los mejores productos de maquillaje para resaltar tu belleza.</p>
      </header>

      {/* Grid de Productos */}
      <div className="productos-grid">
        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toFixed(2)}</p>
            <div className="acciones">
              {/* Botón Ver Más */}
              <button onClick={() => setMostrarDetalles(producto)}>Ver más</button>
              {/* Botón Favoritos */}
              <button
                className={`favorito-btn ${
                  favoritos.some((fav) => fav.id === producto.id) ? "guardado" : ""
                }`}
                onClick={() => toggleFavorito(producto)}
              >
                {favoritos.some((fav) => fav.id === producto.id) ? "❤️ Guardado" : "🤍 Guardar"}
              </button>
            </div>
            {/* Botón Añadir al Carrito */}
            <button
              className="btn-carrito"
              onClick={() => agregarAlCarrito(producto)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Detalles */}
      {mostrarDetalles && (
        <div className="modal">
          <div className="modal-content">
            <h2>{mostrarDetalles.nombre}</h2>
            <p>{mostrarDetalles.detalles}</p>
            <button onClick={() => setMostrarDetalles(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="productos-footer">
        <p>Garantía de satisfacción</p>
      </footer>
    </div>
  );
}

export default Maquillaje;
