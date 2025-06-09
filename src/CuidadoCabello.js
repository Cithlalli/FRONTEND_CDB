import React, { useState, useContext } from "react";
import "./App.css";
import "./CuidadoCabello.css";
import { CarritoContext } from "./components/CarritoContext"; 

function CuidadoCabello() {
  const productos = [
    {
      id: 1,
      nombre: "Shampoo Nutritivo",
      precio: 150.99,
      categoria: "Shampoos",
      imagen: "/img/shampoo.png",
      detalles: "Shampoo con nutrientes para todo tipo de cabello.",
    },
    {
      id: 2,
      nombre: "Acondicionador Reparador",
      precio: 180.99,
      categoria: "Acondicionadores",
      imagen: "/img/acondicionador.png",
      detalles: "Repara tu cabello con ingredientes naturales.",
    },
    {
      id: 3,
      nombre: "Mascarilla Capilar",
      precio: 250.99,
      categoria: "Tratamientos",
      imagen: "/img/mascarilla.png",
      detalles: "Hidrata profundamente con esta mascarilla.",
    },
  ];

  const [mostrarDetalles, setMostrarDetalles] = useState(null); // Modal de detalles
  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext); // Accede al contexto global

  return (
    <div className="cuidado-cabello-page">
      {/* Encabezado */}
      <header>
        <h1>Cuidado del Cabello</h1>
        <p>Encuentra los mejores productos para un cabello sano y brillante.</p>
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
              <button onClick={() => setMostrarDetalles(producto)}>
                Ver más
              </button>
              {/* Botón Favoritos */}
              <button
                className={`favorito-btn ${
                  favoritos.some((fav) => fav.id === producto.id) ? "guardado" : ""
                }`}
                onClick={() => toggleFavorito(producto)}
              >
                {favoritos.some((fav) => fav.id === producto.id) ? "❤️ Guardado" : "🤍 Guardar"}
              </button>
              {/* Botón Añadir al Carrito */}
              <button
                className="btn-carrito"
                onClick={() => agregarAlCarrito(producto)}
              >
                🛒 Añadir al carrito
              </button>
            </div>
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

export default CuidadoCabello;
