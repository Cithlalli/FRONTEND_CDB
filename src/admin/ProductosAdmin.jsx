import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductosAdmin() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [cambio, setCambio] = useState(true)
    const [productos, setProductos] = useState([]);

    const [modalProducto, setModalProducto] = useState(null); // Controla el modal para Editar/Agregar
    const [esEditar, setEsEditar] = useState(false); // Diferencia entre Editar y Agregar
    const [nuevoProducto, setNuevoProducto] = useState({
        nombreProducto: "",
        descripcion:"",
        precio: "",
        stock: "",
        categoria: "",
        marca: "",
        caracteristicas: "",
        imagenUrl: "",
    });

    // Opciones para Select
    const [opcionesCategorias, setCategorias] = useState([]);
    const [opcionesMarcas, setMarcas] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${apiUrl}/Productos`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();
                //console.log(data);
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        }

        const fetchCategorias = async () => {
            try {
                const response = await fetch(`${apiUrl}/Categorias`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();
                //console.log(data);
                setCategorias(data);
            } catch (error) {
                console.error("Error al obtener las categorias:", error);
            }
        }

        const fetchMarcas = async () => {
            try {
                const response = await fetch(`${apiUrl}/Marcas`, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();
                //console.log(data);
                setMarcas(data);
            } catch (error) {
                console.error("Error al obtener las marcas:", error);
            }
        }

        fetchProductos();
        fetchCategorias();
        fetchMarcas();
    }, [cambio]);

    // Abre modal de Agregar
    const handleAbrirModalAgregar = () => {
        setEsEditar(false);
        setModalProducto({
            nombreProducto: "",
            descripcion:"",
            precio: "",
            stock: "",
            categoria: "",
            marca: "",
            caracteristicas: "",
            imagenUrl: "",
        });
    };

    // Abre modal de Editar
    const handleEditar = (producto) => {
        setEsEditar(true);
        setModalProducto({
            nombreProducto: producto.nombreProducto,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            categoria: producto.idCategoria,
            marca: producto.idMarca,
            caracteristicas: producto.caracteristicas,
            imagenUrl: producto.imagenURl,
        });

        setNuevoProducto({
            idProducto: producto.idProducto,
            nombreProducto: producto.nombreProducto,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            categoria: producto.idCategoria,
            marca: producto.idMarca,
            caracteristicas: producto.caracteristicas,
            imagenUrl: producto.imagenURl,
        });
    };

    // Maneja cambios en inputs
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagenUrl") {
            setNuevoProducto({ ...nuevoProducto, imagenUrl: files[0] });
            setModalProducto({...modalProducto, imagenUrl: files[0]})
        } else {
            setNuevoProducto({ ...nuevoProducto, [name]: value });
            setModalProducto({...modalProducto, [name]: value})
        }
    };

    // Guarda cambios del modal (Agregar/Editar)
    const handleGuardar = async () => {
        if (
            !nuevoProducto.nombreProducto.trim() ||
            !nuevoProducto.precio ||
            !nuevoProducto.stock ||
            !nuevoProducto.categoria ||
            !nuevoProducto.marca ||
            !nuevoProducto.caracteristicas.trim()
        ) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append("NombreProducto", nuevoProducto.nombreProducto);
        formData.append("Precio", nuevoProducto.precio);
        formData.append("Stock", nuevoProducto.stock);
        formData.append("IdCategoria", nuevoProducto.categoria);
        formData.append("IdMarca", nuevoProducto.marca);
        formData.append("Caracteristicas", nuevoProducto.caracteristicas);
        formData.append("Imagen", nuevoProducto.imagenUrl);

        if (esEditar) {
            try {
                const response = await fetch(`${apiUrl}/productos/${nuevoProducto.idProducto}`, {
                    method: "PUT",
                    body: formData,
                });

                if (!response.ok) throw new Error("Error al editar producto");

                const data = await response.json();
                console.log("Producto editado:", data);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            try {
                const response = await fetch(`${apiUrl}/productos`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Error al guardar producto");

                const data = await response.json();
                console.log("Producto guardado:", data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        setModalProducto(null);
        setCambio(!cambio);
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
                        <tr key={producto.idProducto} className="text-center align-middle">
                            <td>{producto.idProducto}</td>
                            <td>{producto.nombreProducto}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.categoria.nombreCategoria}</td>
                            <td>{producto.marca.nombreMarca}</td>
                            <td>{producto.caracteristicas}</td>
                            <td>
                                {producto.imagenUrl ? (
                                    <img
                                        src={producto.imagenUrl}
                                        alt={producto.nombreProducto}
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
                                    name="nombreProducto"
                                    value={modalProducto.nombreProducto}
                                    onChange={handleInputChange}
                                    placeholder="Nombre"
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    name="descripcion"
                                    value={modalProducto.descripcion}
                                    onChange={handleInputChange}
                                    placeholder="Descripción"
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
                                        <option key={index} value={cat.idCategoria}>
                                            {cat.nombreCategoria}
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
                                        <option key={index} value={marca.idMarca}>
                                            {marca.nombreMarca}
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
                                    name="imagenUrl"
                                    accept="image/*"
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
