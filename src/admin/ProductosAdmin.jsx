import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductosAdmin() {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Producto 1",
      precio: 199.99,
      stock: 50,
      categoria: "Cuidado de la Piel",
      marca: "Marca A",
      caracteristicas: "Hidratante y suave",
      imagen: "",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 299.99,
      stock: 30,
      categoria: "Maquillaje",
      marca: "Marca B",
      caracteristicas: "Resistente al agua",
      imagen: "",
    },
  ]);

  const [modalProducto, setModalProducto] = useState(null); // Controla el modal para Editar/Agregar
  const [esEditar, setEsEditar] = useState(false); // Diferencia entre Editar y Agregar
  const [nuevoProducto, setNuevoProducto] = useState({
    id: null,
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    marca: "",
    caracteristicas: "",
    imagen: "",
  });

  // Opciones para Select
  const opcionesCategorias = ["Cuidado de la Piel", "Maquillaje", "Cuidado del Cabello"];
  const opcionesMarcas = ["Marca A", "Marca B", "Marca C"];

  // Abre modal de Agregar
  const handleAbrirModalAgregar = () => {
    setEsEditar(false);
    setModalProducto({
      id: productos.length + 1,
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
      marca: "",
      caracteristicas: "",
      imagen: "",
    });
  };

  // Abre modal de Editar
  const handleEditar = (producto) => {
    setEsEditar(true);
    setModalProducto({ ...producto });
  };

  // Maneja cambios en inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setModalProducto({
        ...modalProducto,
        imagen: URL.createObjectURL(files[0]),
      });
    } else {
      setModalProducto({ ...modalProducto, [name]: value });
    }
  };

  // Guarda cambios del modal (Agregar/Editar)
  const handleGuardar = () => {
    if (esEditar) {
      setProductos(
        productos.map((p) => (p.id === modalProducto.id ? modalProducto : p))
      );
    } else {
      setProductos([...productos, modalProducto]);
    }
    setModalProducto(null);
  };

  // Elimina producto
  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gestión de Productos</h2>

      {/* Botón Agregar */}
      <button className="btn btn-primary mb-3" onClick={handleAbrirModalAgregar}>
        Agregar Producto
      </button>

      {/* Tabla de Productos */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Características</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="text-center align-middle">
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td>{producto.categoria}</td>
              <td>{producto.marca}</td>
              <td>{producto.caracteristicas}</td>
              <td>
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-thumbnail"
                    style={{ width: "60px", height: "60px" }}
                  />
                ) : (
                  "No Disponible"
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditar(producto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para Agregar/Editar Producto */}
      {modalProducto && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {esEditar ? "Editar Producto" : "Agregar Producto"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setModalProducto(null)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Campos del Formulario */}
                <input
                  type="text"
                  className="form-control mb-2"
                  name="nombre"
                  value={modalProducto.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  name="precio"
                  value={modalProducto.precio}
                  onChange={handleInputChange}
                  placeholder="Precio"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  name="stock"
                  value={modalProducto.stock}
                  onChange={handleInputChange}
                  placeholder="Stock"
                />
                <select
                  className="form-select mb-2"
                  name="categoria"
                  value={modalProducto.categoria}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione una Categoría</option>
                  {opcionesCategorias.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select mb-2"
                  name="marca"
                  value={modalProducto.marca}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione una Marca</option>
                  {opcionesMarcas.map((marca, index) => (
                    <option key={index} value={marca}>
                      {marca}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="caracteristicas"
                  value={modalProducto.caracteristicas}
                  onChange={handleInputChange}
                  placeholder="Características"
                />
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={handleInputChange}
                />
                {modalProducto.imagen && (
                  <img
                    src={modalProducto.imagen}
                    alt="Previsualización"
                    className="img-thumbnail mt-2"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalProducto(null)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={handleGuardar}>
                  {esEditar ? "Guardar Cambios" : "Agregar Producto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;
