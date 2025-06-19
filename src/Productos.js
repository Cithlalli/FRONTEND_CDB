import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Productos.css";
import { CarritoContext } from "./components/CarritoContext";

function Productos() {
  const [productos, setProductos] = useState([]);

  const [categorias, setCategorias] = useState([]);

  // Contexto del carrito y favoritos
  const { agregarAlCarrito, favoritos, toggleFavorito } = useContext(CarritoContext);

  // Obtener parámetros de búsqueda de la URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const terminoBusqueda = query.get("buscar") || "";

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas las Categorías");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/Productos`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProductos(data); // ✅ solo carga productos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${apiUrl}/Categorias`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        //console.log("categorias: ", data);
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    };

    fetchCategorias();
    fetchProductos();
  }, []);

  useEffect(() => {
    let resultado = productos;

    if (categoriaSeleccionada !== "Todas las Categorías") {
      resultado = resultado.filter(
        (producto) =>
          producto.idCategoria == categoriaSeleccionada
      );
    }

    if (terminoBusqueda) {
      resultado = resultado.filter(
        (producto) =>
          producto.nombreProducto.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          producto.categoria?.nombreCategoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }

    //console.log(favoritos);
    setProductosFiltrados(resultado);
  }, [productos, categoriaSeleccionada, terminoBusqueda]);

  return (
    <div className="productos-page">
      <header className="productos-header">
        <h1>¡Encuentra lo mejor para tu cuidado!</h1>
        <p>Aprovecha nuestras ofertas exclusivas del día.</p>
      </header>

      <div className="filtros-contenedor">
        <label htmlFor="categoria">Filtrar por Categoría</label>
        <select id="categoria" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="Todas las Categorías">
              Todas las Categorías
            </option>
          {categorias.map((cat) => (
            <option key={cat.idCategoria} value={cat.idCategoria}>
              {cat.nombreCategoria}
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
            <div className="producto-card" key={producto.idProducto}>
              <span className="producto-descuento">{producto.descuento}</span>
              <img src={producto.imagenUrl} alt={producto.nombreProducto} className="producto-imagen" />
              <h3 className="producto-nombre">{producto.nombreProducto}</h3>
              <p className="producto-precio">${producto.precio.toFixed(2)}</p>
              <p className="producto-calificacion">⭐ {producto.calificacion} / 5</p>
              <div className="acciones">
                <button className="btn-carrito" onClick={() => agregarAlCarrito(producto)}>
                  Añadir al carrito
                </button>
                <button
                  className={`favorito-btn ${favoritos.some((fav) => fav.idProducto === producto.idProducto && fav.activo===true) ? "guardado" : ""}`}
                  onClick={() => toggleFavorito(producto)}
                >
                  {favoritos.some((fav) => fav.idProducto === producto.idProducto && fav.activo===true) ? "❤️ Guardado" : "🤍 Guardar"}
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
