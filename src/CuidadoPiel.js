import React, { useState, useContext } from "react";
import "./Productos.css";
import { CarritoContext } from "./components/CarritoContext";

function CuidadoPiel() {
  const productos = [
    { id: 1, nombre: "Limpiador Facial", precio: 199.99, descuento: "10% OFF", calificacion: 4.5, categoria: "Cremas Hidratantes", imagen: "/img/limpiador.png", detalles: "Un limpiador suave para todo tipo de piel." },
    { id: 2, nombre: "Tónico Calmante", precio: 299.99, descuento: "15% OFF", calificacion: 4.8, categoria: "Tónicos Faciales", imagen: "/img/tonico.png", detalles: "Calma e hidrata la piel con este tónico natural." },
    { id: 3, nombre: "Serum Hidratante", precio: 399.99, descuento: "20% OFF", calificacion: 4.3, categoria: "Sérums Faciales", imagen: "/img/serum.png", detalles: "Un sérum intensivo que revitaliza la piel." },
    { id: 4, nombre: "Crema Hidratante", precio: 249.99, descuento: "", calificacion: 4.7, categoria: "Cremas Hidratantes", imagen: "/img/crema.png", detalles: "Hidrata profundamente con esta crema diaria." },
  ];

  const [productosOrdenados, setProductosOrdenados] = useState(productos);
  const [mostrarDetalles, setMostrarDetalles] = useState(null);

  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext);

  const handleOrdenar = (criterio) => {
    const ordenados = [...productos].sort((a, b) => {
      if (criterio === "precio-asc") return a.precio - b.precio; 
      if (criterio === "precio-desc") return b.precio - a.precio;
      if (criterio === "calificacion") return b.calificacion - a.calificacion;
      return 0;
    });
    setProductosOrdenados(ordenados);
  };

  return (
    <div className="productos-page">
      <header className="productos-header">
        <h1>Cuidado de la Piel</h1>
        <p>Descubre los mejores productos para cuidar tu piel.</p>
      </header>

      {/* Filtros y Ordenación */}
      <div className="filtros-contenedor">
        <label htmlFor="ordenar">Ordenar por:</label>
        <select id="ordenar" onChange={(e) => handleOrdenar(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="precio-asc">Precio (menor a mayor)</option>
          <option value="precio-desc">Precio (mayor a menor)</option>
          <option value="calificacion">Mejor calificación</option>
        </select>
      </div>

      {/* Productos */}
      <div className="productos-grid">
        {productosOrdenados.map((producto) => (
          <div
            className={`producto-card ${producto.descuento ? "en-oferta" : ""}`}
            key={producto.id}
          >
            <span className="producto-descuento">{producto.descuento}</span>
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-precio">${producto.precio.toFixed(2)}</p>
            <p className="producto-calificacion">⭐ {producto.calificacion} / 5</p>
            <div className="acciones-producto">
              <button
                className={`btn-favorito ${favoritos.some((fav) => fav.id === producto.id) ? "activo" : ""}`}
                onClick={() => toggleFavorito(producto)}
              >
                {favoritos.some((fav) => fav.id === producto.id) ? "❤️ Guardado" : "🤍 Guardar"}
              </button>
              <button onClick={() => setMostrarDetalles(producto)}>Ver más</button>
              <button className="btn-carrito" onClick={() => agregarAlCarrito(producto)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalles */}
      {mostrarDetalles && (
        <div className="modal-detalles">
          <div className="modal-contenido">
            <h2>{mostrarDetalles.nombre}</h2>
            <p>{mostrarDetalles.detalles}</p>
            <button onClick={() => setMostrarDetalles(null)}>Cerrar</button>
          </div>
        </div>
      )}

      <footer className="productos-footer">
        <p>Garantía de satisfacción</p>
      </footer>
    </div>
  );
}

export default CuidadoPiel;
