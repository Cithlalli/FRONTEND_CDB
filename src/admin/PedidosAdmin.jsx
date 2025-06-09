import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPanel.css'; // Importamos el CSS aparte

function PedidosAdmin() {
  // Estados
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      productos: [
        { nombre: "Producto 1", cantidad: 2, precio: 50 },
        { nombre: "Producto 2", cantidad: 1, precio: 30 },
      ],
      estado: "Pendiente",
      ticket: "https://via.placeholder.com/100",
      comentario: "",
      historial: [],
    },
    {
      id: 2,
      cliente: "Ana Gómez",
      productos: [{ nombre: "Producto 3", cantidad: 3, precio: 20 }],
      estado: "En Proceso",
      ticket: null,
      comentario: "",
      historial: [],
    },
  ]);

  const [historialGlobal, setHistorialGlobal] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState(null);
  const [comentarios, setComentarios] = useState({});
  const [estadosEditados, setEstadosEditados] = useState({});

  // Función para calcular el total de un pedido
  const calcularTotalPedido = (productos) => {
    return productos.reduce((total, producto) => 
      total + (producto.cantidad * producto.precio), 0
    );
  };

  // Efecto para cargar datos guardados en localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('pedidosAdmin');
    if (datosGuardados) {
      const { pedidos, historial } = JSON.parse(datosGuardados);
      setPedidos(pedidos);
      setHistorialGlobal(historial);
    }
  }, []);

  // Efecto para guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem('pedidosAdmin', JSON.stringify({ pedidos, historial: historialGlobal }));
  }, [pedidos, historialGlobal]);

  // Handler para cambiar comentarios
  const handleComentarioChange = (id, texto) => {
    setComentarios(prev => ({ ...prev, [id]: texto }));
  };

  // Handler para guardar cambios
  const handleGuardarCambios = () => {
    const cambios = pedidos.map(pedido => {
      if (estadosEditados[pedido.id]) {
        const historialEntry = {
          id: pedido.id,
          fecha: new Date().toISOString(),
          estadoAnterior: pedido.estado,
          estadoNuevo: estadosEditados[pedido.id],
          comentario: comentarios[pedido.id] || '',
          cliente: pedido.cliente
        };
        
        return {
          ...pedido,
          estado: estadosEditados[pedido.id],
          comentario: comentarios[pedido.id] || '',
          historial: [...pedido.historial, historialEntry]
        };
      }
      return pedido;
    });

    setPedidos(cambios);
    setHistorialGlobal(prev => [...prev, ...cambios.flatMap(p => p.historial)]);
    setEstadosEditados({});
    setComentarios({});
    toast.success('Cambios guardados exitosamente');
  };

  // Componente para mostrar el estado como un badge
  const EstadoBadge = ({ estado }) => {
    const estilos = {
      Pendiente: 'badge-danger',
      'En Proceso': 'badge-warning',
      Completado: 'badge-success'
    };
    
    return (
      <span className={`badge ${estilos[estado]}`}>
        {estado}
      </span>
    );
  };

  // Filtrado del historial por fecha
  const historialFiltrado = filtroFecha 
    ? historialGlobal.filter(item => 
        format(parseISO(item.fecha), 'yyyy-MM-dd') === format(filtroFecha, 'yyyy-MM-dd')
      )
    : historialGlobal;

  return (
    <div className="container mt-4">
      <ToastContainer />
      
      <h2 className="text-center mb-4 titulo-principal">
        <i className="fas fa-clipboard-list me-2"></i>
        Gestión de Pedidos
      </h2>

      {/* Tabla principal */}
      <div className="table-responsive">
        <table className="table table-hover tabla-pedidos">
          <thead className="encabezado-tabla">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Ticket</th>
              <th>Comentarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id} className="fila-pedido">
                <td>#{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>
                  <ul className="lista-productos">
                    {pedido.productos.map((producto, index) => (
                      <li key={index}>
                        <span className="nombre-producto">{producto.nombre}</span>
                        <span className="detalle-producto">
                          ({producto.cantidad} × ${producto.precio})
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="total-pedido">
                  ${calcularTotalPedido(pedido.productos).toFixed(2)}
                </td>
                <td>
                  <select 
                    className="form-select select-estado"
                    value={estadosEditados[pedido.id] || pedido.estado}
                    onChange={(e) => setEstadosEditados(prev => ({
                      ...prev,
                      [pedido.id]: e.target.value
                    }))}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completado">Completado</option>
                  </select>
                </td>
                <td>
                  {pedido.ticket ? (
                    <a 
                      href={pedido.ticket} 
                      className="btn btn-sm btn-ticket"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-receipt"></i> Ver Ticket
                    </a>
                  ) : (
                    <span className="text-muted">Sin ticket</span>
                  )}
                </td>
                <td>
                  <div className="comentarios-container">
                    <input
                      type="text"
                      className="form-control input-comentario"
                      placeholder="Escribe un comentario..."
                      value={comentarios[pedido.id] || ''}
                      onChange={(e) => handleComentarioChange(pedido.id, e.target.value)}
                    />
                    <button 
                      className="btn btn-sm btn-enviar-comentario"
                      onClick={() => {
                        setPedidos(prev => prev.map(p => 
                          p.id === pedido.id 
                            ? { ...p, comentario: comentarios[pedido.id] } 
                            : p
                        ));
                        setComentarios(prev => ({ ...prev, [pedido.id]: '' }));
                      }}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-eliminar"
                    onClick={() => {
                      if (window.confirm('¿Confirmar eliminación?')) {
                        setPedidos(prev => prev.filter(p => p.id !== pedido.id));
                        toast.error('Pedido eliminado');
                      }
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección de Historial */}
      <div className="historial-container">
        <h3 className="titulo-historial">
          <i className="fas fa-history me-2"></i>
          Historial de Cambios
        </h3>
        
        <div className="filtro-container">
          <DatePicker
            selected={filtroFecha}
            onChange={date => setFiltroFecha(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Filtrar por fecha"
            className="form-control filtro-fecha"
            isClearable
          />
        </div>

        <div className="tabla-historial">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Cambio de Estado</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {historialFiltrado.map((item, index) => (
                <tr key={index} className="entrada-historial">
                  <td>{format(parseISO(item.fecha), 'dd/MM/yyyy HH:mm')}</td>
                  <td>{item.cliente}</td>
                  <td>
                    <EstadoBadge estado={item.estadoAnterior} /> 
                    <i className="fas fa-arrow-right mx-2"></i>
                    <EstadoBadge estado={item.estadoNuevo} />
                  </td>
                  <td>{item.comentario || <em>Sin comentario</em>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón de Guardar */}
      <div className="acciones-finales">
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleGuardarCambios}
          disabled={Object.keys(estadosEditados).length === 0}
        >
          <i className="fas fa-save me-2"></i>
          Guardar Todos los Cambios
        </button>
      </div>
    </div>
  );
}

export default PedidosAdmin;