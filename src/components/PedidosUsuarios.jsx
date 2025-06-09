import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function PedidosUsuario() {
  const [pedidos, setPedidos] = useState([]);
  const [paqueterias, setPaqueterias] = useState([]);

  useEffect(() => {
    // Simulación de datos de pedidos
    const pedidosSimulados = [
      {
        id: 1,
        fecha: "2024-12-15",
        estado: "Enviado",
        total: 499.99,
        productos: ["Producto 1", "Producto 2"],
      },
      {
        id: 2,
        fecha: "2024-12-10",
        estado: "Entregado",
        total: 299.99,
        productos: ["Producto 3"],
      },
      {
        id: 3,
        fecha: "2024-12-20",
        estado: "En proceso",
        total: 199.99,
        productos: ["Producto 4", "Producto 5"],
      },
    ];

    // Simulación de datos de paqueterías
    const paqueteriasSimuladas = [
      { nombre: "Estafeta", link: "https://www.estafeta.com", icono: "fas fa-truck" },
      { nombre: "DHL", link: "https://www.dhl.com", icono: "fas fa-shipping-fast" },
      { nombre: "FedEx", link: "https://www.fedex.com", icono: "fas fa-box" },
    ];

    setPedidos(pedidosSimulados);
    setPaqueterias(paqueteriasSimuladas);
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Mis Pedidos</h2>
      <Table striped bordered hover>
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="text-center align-middle">
              <td>{pedido.id}</td>
              <td>{pedido.fecha}</td>
              <td>
                <Badge
                  bg={
                    pedido.estado === "Enviado"
                      ? "primary"
                      : pedido.estado === "Entregado"
                      ? "success"
                      : "warning"
                  }
                  text={pedido.estado === "En proceso" ? "dark" : ""}
                >
                  {pedido.estado}
                </Badge>
              </td>
              <td>${pedido.total.toFixed(2)}</td>
              <td>{pedido.productos.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Sección de Paqueterías */}
      <div className="text-center mt-4">
        <h4>Paqueterías Disponibles</h4>
        <Row className="justify-content-center mt-3">
          {paqueterias.map((paqueteria, index) => (
            <Col key={index} xs={4} md={2} className="text-center">
              <a
                href={paqueteria.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <i
                  className={`${paqueteria.icono} fa-2x`}
                  style={{ color: "#FF6F61", marginBottom: "10px" }}
                ></i>
                <p style={{ fontSize: "0.9rem", margin: 0 }}>{paqueteria.nombre}</p>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default PedidosUsuario;
