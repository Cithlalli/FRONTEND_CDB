import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function RegistroUsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Admin Principal", email: "admin@ejemplo.com", rol: "Administrador", password: "admin123" },
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    id: null,
    nombre: "",
    email: "",
    password: "",
    rol: "Administrador",
  });

  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const handleAgregarUsuario = () => {
    if (nuevoUsuario.nombre && nuevoUsuario.email && nuevoUsuario.password) {
      setUsuarios([
        ...usuarios,
        { ...nuevoUsuario, id: usuarios.length + 1 },
      ]);
      setNuevoUsuario({ id: null, nombre: "", email: "", password: "", rol: "Administrador" });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Editar un usuario
  const handleEditarUsuario = (usuario) => {
    setEditandoUsuario(usuario);
    setNuevoUsuario({ ...usuario });
  };

  // Guardar cambios de usuario editado
  const handleGuardarCambios = () => {
    setUsuarios(usuarios.map((u) => (u.id === nuevoUsuario.id ? nuevoUsuario : u)));
    setEditandoUsuario(null);
    setNuevoUsuario({ id: null, nombre: "", email: "", password: "", rol: "Administrador" });
  };

  // Eliminar usuario
  const handleEliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        <i className="fa fa-user-shield me-2"></i>Registro de Usuarios Administrativos
      </h2>

      {/* Formulario para agregar/editar usuario */}
      <div className="card mb-4 shadow">
        <div className="card-header bg-primary text-white">
          <i className="fa fa-user-plus me-2"></i>
          {editandoUsuario ? "Editar Usuario" : "Agregar Nuevo Usuario"}
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="nombre"
              value={nuevoUsuario.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo Electrónico"
              name="email"
              value={nuevoUsuario.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 input-group">
            <input
              type={mostrarPassword ? "text" : "password"}
              className="form-control"
              placeholder="Contraseña"
              name="password"
              value={nuevoUsuario.password}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              <i className={`fa ${mostrarPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="rol"
              value={nuevoUsuario.rol}
              onChange={handleInputChange}
            >
              <option value="Administrador">Administrador</option>
              <option value="Editor">Editor</option>
              <option value="Moderador">Moderador</option>
            </select>
          </div>
          <button
            className={`btn ${editandoUsuario ? "btn-warning" : "btn-success"}`}
            onClick={editandoUsuario ? handleGuardarCambios : handleAgregarUsuario}
          >
            <i className={`fa ${editandoUsuario ? "fa-save" : "fa-plus"} me-2`}></i>
            {editandoUsuario ? "Guardar Cambios" : "Agregar Usuario"}
          </button>
        </div>
      </div>

      <h4 className="mb-3">
        <i className="fa fa-users me-2"></i>Usuarios Registrados
      </h4>
      <table className="table table-striped table-bordered shadow">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="text-center align-middle">
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditarUsuario(usuario)}
                >
                  <i className="fa fa-edit"></i> Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminarUsuario(usuario.id)}
                >
                  <i className="fa fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistroUsuariosAdmin;
