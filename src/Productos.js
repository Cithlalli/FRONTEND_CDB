import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Productos.css";
import { CarritoContext } from "./components/CarritoContext";

function Productos() {
  const productos = [
    { id: 1, nombre: "Limpiador Facial", precio: 199.99, descuento: "10% OFF", calificacion: 4.5, categoria: "Limpiadores Faciales", imagen: "/img/limpiador.png" },
    { id: 2, nombre: "Tónico Calmante", precio: 299.99, descuento: "15% OFF", calificacion: 4.8, categoria: "Tónicos", imagen: "/img/tonico.png" },
    { id: 3, nombre: "Serum Hidratante", precio: 399.99, descuento: "20% OFF", calificacion: 4.3, categoria: "Serums y Ampolletas", imagen: "/img/serum.png" },
    { id: 4, nombre: "Protector Solar", precio: 249.99, descuento: "5% OFF", calificacion: 4.7, categoria: "Protección Solar", imagen: "/img/protector.png" },
  ];

  const categorias = [
    "Todas las Categorías",
    "Limpiadores Faciales",
    "Tónicos",
    "Serums y Ampolletas",
    "Protección Solar",
    "Cuidado del Cabello",
    "Maquillaje",
    "Accesorios",
  ];

  // Contexto del carrito y favoritos
  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext);

  // Obtener parámetros de búsqueda de la URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const terminoBusqueda = query.get("buscar") || "";

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las Categorías");
  const [productosFiltrados, setProductosFiltrados] = useState(productos);

  // Filtrar productos por categoría o búsqueda
  useEffect(() => {
    let resultado = productos;

    if (categoriaSeleccionada !== "Todas las Categorías") {
      resultado = resultado.filter((producto) => producto.categoria === categoriaSeleccionada);
    }

    if (terminoBusqueda) {
      resultado = resultado.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }

    setProductosFiltrados(resultado);
  }, [categoriaSeleccionada, terminoBusqueda]);

  return (
    <div className="productos-page">
      <header className="productos-header">
        <h1>¡Encuentra lo mejor para tu cuidado!</h1>
        <p>Aprovecha nuestras ofertas exclusivas del día.</p>
      </header>

      <div className="filtros-contenedor">
        <label htmlFor="categoria">Filtrar por Categoría</label>
        <select id="categoria" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="no-productos">
          <h2>No se encontraron productos relacionados con "{terminoBusqueda}"</h2>
        </div>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <div className="producto-card" key={producto.id}>
              <span className="producto-descuento">{producto.descuento}</span>
              <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-precio">${producto.precio.toFixed(2)}</p>
              <p className="producto-calificacion">⭐ {producto.calificacion} / 5</p>
              <div className="acciones">
                <button className="btn-carrito" onClick={() => agregarAlCarrito(producto)}>
                  Añadir al carrito
                </button>
                <button
                  className={`favorito-btn ${favoritos.some((fav) => fav.id === producto.id) ? "guardado" : ""}`}
                  onClick={() => toggleFavorito(producto)}
                >
                  {favoritos.some((fav) => fav.id === producto.id) ? "❤️ Guardado" : "🤍 Guardar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;
