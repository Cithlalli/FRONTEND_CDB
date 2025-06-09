import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import "./Register.css"; // Asegúrate de que la ruta sea correcta

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "El nombre es obligatorio";
        else if (value.length < 3) newErrors.name = "Mínimo 3 caracteres";
        else delete newErrors.name;
        break;
        
      case "phone":
        if (!value) newErrors.phone = "El teléfono es obligatorio";
        else if (!/^\d{10}$/.test(value)) newErrors.phone = "Teléfono inválido (10 dígitos)";
        else delete newErrors.phone;
        break;
        
      case "email":
        if (!value) newErrors.email = "El email es obligatorio";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = "Email inválido";
        else delete newErrors.email;
        break;
        
      case "password":
        if (!value) newErrors.password = "La contraseña es obligatoria";
        else if (value.length < 8) newErrors.password = "Mínimo 8 caracteres";
        else if (!/(?=.*[a-z])/.test(value)) newErrors.password = "Al menos una minúscula";
        else if (!/(?=.*[A-Z])/.test(value)) newErrors.password = "Al menos una mayúscula";
        else if (!/(?=.*\d)/.test(value)) newErrors.password = "Al menos un número";
        else if (!/(?=.*[@$!%*?&])/.test(value)) newErrors.password = "Al menos un carácter especial";
        else delete newErrors.password;
        break;
        
      case "confirmPassword":
        if (value !== formData.password) newErrors.confirmPassword = "Las contraseñas no coinciden";
        else delete newErrors.confirmPassword;
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear teléfono mientras se escribe
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").substring(0, 10);
      const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    // Validar todos los campos
    const isValid = Object.entries(formData).every(([name, value]) => validateField(name, value));

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        phone: formData.phone.replace(/\D/g, ""), // Guardar solo números
        email: formData.email,
        password: formData.password
      });
      
      setSuccessMessage("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="w-100" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          
          {errors.general && <Alert variant="danger">{errors.general}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ej: María González"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Ej: (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ej: usuario@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? "Registrando..." : "Crear Cuenta"}
            </Button>

            <div className="text-center">
              <small>
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-decoration-none">
                  Inicia Sesión
                </Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;