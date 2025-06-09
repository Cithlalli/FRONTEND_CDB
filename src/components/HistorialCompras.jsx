import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { Card, Container, Button, Alert } from "react-bootstrap";

const HistorialCompras = () => {
  const { user } = useAuth();

  const compras = user?.compras || [
    {
      id: 1,
      fecha: "2023-10-15",
      productos: [
        { nombre: "Crema Hidratante", precio: 25, cantidad: 2 },
        { nombre: "Shampoo Reparador", precio: 15, cantidad: 1 },
      ],
      total: 65,
    },
    {
      id: 2,
      fecha: "2023-09-30",
      productos: [
        { nombre: "Base de Maquillaje", precio: 30, cantidad: 1 },
      ],
      total: 30,
    },
  ];

  if (!user) {
    return (
      <Container className="mt-5">
        <Card className="shadow">
          <Card.Body className="text-center py-5">
            <h2>Historial de Compras</h2>
            <p className="lead">
              Inicia sesión para ver tu historial completo de compras.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Button as={Link} to="/registro" variant="primary" size="lg">
                Crear Cuenta
              </Button>
              <Button as={Link} to="/login" variant="outline-primary" size="lg">
                Iniciar Sesión
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Historial de Compras</h2>

      {compras.length === 0 ? (
        <Alert variant="info" className="text-center">
          Aún no has realizado ninguna compra.
        </Alert>
      ) : (
        compras.map((compra) => (
          <Card key={compra.id} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Compra #{compra.id}</h5>
                <small className="text-muted">{compra.fecha}</small>
              </div>

              <ul className="list-group mb-3">
                {compra.productos.map((producto, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span className="fw-bold">{producto.nombre}</span>
                      <br />
                      <small className="text-muted">
                        {producto.cantidad} × ${producto.precio.toFixed(2)}
                      </small>
                    </div>
                    <span>${(producto.cantidad * producto.precio).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-end">
                <h5 className="mb-0">
                  Total: <span className="text-success">${compra.total.toFixed(2)}</span>
                </h5>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default HistorialCompras;