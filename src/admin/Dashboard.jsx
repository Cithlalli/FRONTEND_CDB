import React, { useState, useEffect } from "react";
import GraficaProductos from "./GraficaProductos";
import { Table, Form, Button, Modal } from "react-bootstrap";

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [pedidosRecientes, setPedidosRecientes] = useState(0);

  // Datos de contacto
  const [contacto, setContacto] = useState({
    telefono: "+899 495 4652",
    correo: "iveethernandez@yahoo.com",
    direccion: "Rancho Grande 228, Rancho Grande, Reynosa, Tamps.",
  });

  // Datos de paqueterías
  const [paqueterias, setPaqueterias] = useState([
    { nombre: "Estafeta", link: "https://www.estafeta.com" },
    { nombre: "DHL", link: "https://www.dhl.com" },
    { nombre: "FedEx", link: "https://www.fedex.com" },
  ]);

  const [nuevoContacto, setNuevoContacto] = useState({ ...contacto });
  const [nuevaPaqueteria, setNuevaPaqueteria] = useState({ nombre: "", link: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
   
    const obtenerDatos = () => {
      setTotalProductos(120); // Simulando un total de productos
      setPedidosRecientes(25); // Simulando un total de pedidos recientes
    };

    obtenerDatos();
  }, []);

  const handleActualizarContacto = () => {
    setContacto({ ...nuevoContacto });
    setShowModal(false);
  };

  const handleAgregarPaqueteria = () => {
    if (nuevaPaqueteria.nombre && nuevaPaqueteria.link) {
      setPaqueterias([...paqueterias, nuevaPaqueteria]);
      setNuevaPaqueteria({ nombre: "", link: "" });
    }
  };

  const handleEliminarPaqueteria = (index) => {
    const nuevasPaqueterias = paqueterias.filter((_, i) => i !== index);
    setPaqueterias(nuevasPaqueterias);
  };

  return (
    <div>
      <h1 className="mb-4">Resumen del Administrador</h1>

      <div className="d-flex justify-content-around mb-4">
        <div
          className="alert shadow-lg p-3 rounded text-center"
          style={{ backgroundColor: "#FF99C8", color: "white" }}
        >
          <h5>
            <i className="fa fa-shopping-cart me-2"></i> Total Productos
          </h5>
          <h3>{totalProductos}</h3>
        </div>
        <div
          className="alert shadow-lg p-3 rounded text-center"
          style={{ backgroundColor: "#A9DEF9", color: "white" }}
        >
          <h5>
            <i className="fa fa-cube me-2"></i> Pedidos Recientes
          </h5>
          <h3>{pedidosRecientes}</h3>
        </div>
      </div>

      {/* Gráfica de Productos */}
      <h3 className="mb-3">Estadísticas</h3>
      <GraficaProductos />

      {/* Configuración de Contacto */}
      <h3 className="mt-5">Configuración de Contacto</h3>
      <div className="mb-4">
        <p>
          <strong>Teléfono:</strong> {contacto.telefono}
        </p>
        <p>
          <strong>Correo:</strong> {contacto.correo}
        </p>
        <p>
          <strong>Dirección:</strong> {contacto.direccion}
        </p>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Editar Contacto
        </Button>
      </div>

      {/* Modal para editar contacto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={nuevoContacto.telefono}
                onChange={(e) => setNuevoContacto({ ...nuevoContacto, telefono: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={nuevoContacto.correo}
                onChange={(e) => setNuevoContacto({ ...nuevoContacto, correo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={nuevoContacto.direccion}
                onChange={(e) => setNuevoContacto({ ...nuevoContacto, direccion: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleActualizarContacto}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Configuración de Paqueterías */}
      <h3 className="mt-5">Configuración de Paqueterías</h3>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Enlace</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paqueterias.map((paqueteria, index) => (
            <tr key={index}>
              <td>{paqueteria.nombre}</td>
              <td>
                <a href={paqueteria.link} target="_blank" rel="noopener noreferrer">
                  {paqueteria.link}
                </a>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleEliminarPaqueteria(index)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form className="mt-4">
        <h5>Agregar Nueva Paquetería</h5>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nuevaPaqueteria.nombre}
            onChange={(e) => setNuevaPaqueteria({ ...nuevaPaqueteria, nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enlace</Form.Label>
          <Form.Control
            type="text"
            value={nuevaPaqueteria.link}
            onChange={(e) => setNuevaPaqueteria({ ...nuevaPaqueteria, link: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" onClick={handleAgregarPaqueteria}>
          Agregar Paquetería
        </Button>
      </Form>
    </div>
  );
}

export default Dashboard;
