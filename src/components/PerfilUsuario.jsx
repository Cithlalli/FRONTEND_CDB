import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";

const PerfilUsuario = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || ""
  });

  useEffect(()=>{
    setFormData({
    nombre: user?.nombre || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || ""
  });
  },[user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <Container className="mt-5">
        <Card className="shadow">
          <Card.Body className="text-center py-5">
            <h2>¡Hola Invitado!</h2>
            <p className="lead">Regístrate para disfrutar de estos beneficios:</p>
            
            <div className="beneficios-list mb-4">
              <p>✓ Historial de compras permanente</p>
              <p>✓ Guardado de dirección de envío</p>
              <p>✓ Ofertas exclusivas</p>
              <p>✓ Seguimiento de pedidos</p>
            </div>

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
    <Container className="mt-4 perfil-container">
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Mi Perfil</h2>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 555-123-4567"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Dirección de Envío</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Calle, número, ciudad, estado"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PerfilUsuario;