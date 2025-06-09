import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MarcasAdmin() {
  const [marcas, setMarcas] = useState([
    { id: 1, nombre: "Marca 1", categoria: "Cuidado de la Piel", imagen: "", caracteristicas: "Alta calidad" },
    { id: 2, nombre: "Marca 2", categoria: "Cuidado del Cabello", imagen: "", caracteristicas: "Producto orgánico" },
    { id: 3, nombre: "Marca 3", categoria: "Maquillaje", imagen: "", caracteristicas: "Libre de crueldad animal" },
  ]);

  const [marcaEditada, setMarcaEditada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditar = (marca) => {
    setMarcaEditada(marca);
    setShowModal(true);
  };

  const handleAgregar = () => {
    setMarcaEditada({ id: Date.now(), nombre: "", categoria: "", imagen: "", caracteristicas: "" });
    setShowModal(true);
  };

  const handleGuardar = () => {
    setMarcas((prev) => {
      if (marcas.some((m) => m.id === marcaEditada.id)) {
      
        return prev.map((m) => (m.id === marcaEditada.id ? marcaEditada : m));
      } else {
      
        return [...prev, marcaEditada];
      }
    });
    setShowModal(false);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta marca?")) {
      setMarcas(marcas.filter((m) => m.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setMarcaEditada({
      ...marcaEditada,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  return (
    <div style={{ backgroundColor: "#FCF6BD", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ color: "#000000" }}>Gestión de Marcas y Categorías</h2>
      <Button variant="success" style={{ marginBottom: "10px" }} onClick={handleAgregar}>
        Agregar Nuevo
      </Button>
      <Table bordered hover responsive>
        <thead style={{ backgroundColor: "#A9DEF9", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Características</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id}>
              <td>{marca.id}</td>
              <td>{marca.nombre}</td>
              <td>{marca.categoria}</td>
              <td>{marca.caracteristicas || "N/A"}</td>
              <td>
                {marca.imagen ? (
                  <img
                    src={marca.imagen}
                    alt={marca.nombre}
                    style={{ width: "50px", height: "50px", borderRadius: "8px" }}
                  />
                ) : (
                  "No Disponible"
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditar(marca)}>
                  Editar
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleEliminar(marca.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para edición/agregar */}
      {marcaEditada && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton style={{ backgroundColor: "#E4C1F9" }}>
            <Modal.Title>{marcaEditada.id ? "Editar Marca" : "Agregar Nueva Marca"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#E4C1F9" }}>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={marcaEditada.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  value={marcaEditada.categoria}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Características</Form.Label>
                <Form.Control
                  type="text"
                  name="caracteristicas"
                  value={marcaEditada.caracteristicas || ""}
                  onChange={handleInputChange}
                  placeholder="Ejemplo: Alta calidad, Libre de crueldad, etc."
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  onChange={handleInputChange}
                />
                {marcaEditada.imagen && (
                  <img
                    src={marcaEditada.imagen}
                    alt="Previsualización"
                    style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
                  />
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#E4C1F9" }}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardar}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default MarcasAdmin;
