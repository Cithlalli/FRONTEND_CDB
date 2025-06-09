import React, { useContext, useState } from "react";
import "./ListaProductos.css";
import { CarritoContext } from "./CarritoContext";

const productos = [
  {
    id: 1,
    nombre: "Limpiador Facial",
    categoria: "Limpiadores Faciales",
    precio: "$299.99",
    imagen: "/img/limpiador.png",
  },
  {
    id: 2,
    nombre: "Tónico Calmante",
    categoria: "Tónicos",
    precio: "$199.99",
    imagen: "/img/tonico.png",
  },
  {
    id: 3,
    nombre: "Serum Hidratante",
    categoria: "Sérums",
    precio: "$399.99",
    imagen: "/img/serum.png",
  },
];

function ListaProductos({ filtroActivo }) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const productosFiltrados = filtroActivo
    ? productos.filter((producto) => producto.categoria === filtroActivo)
    : productos;

  return (
    <div className="productos-grid">
      {productosFiltrados.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>{producto.precio}</p>
          <div className="producto-acciones">
            <button
              className="btn-carrito"
              onClick={() => agregarAlCarrito(producto)}
            >
              🛒 Añadir al carrito
            </button>
            <button
              className={`btn-favorito ${
                favoritos.includes(producto.id) ? "activo" : ""
              }`}
              onClick={() => toggleFavorito(producto.id)}
            >
              {favoritos.includes(producto.id) ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaProductos;
