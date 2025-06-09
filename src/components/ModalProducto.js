import React from 'react';


function ModalProducto({ producto, cerrarModal }) {
  if (!producto) return null;

  return (
    <div className="fondo-modal">
      <div className="contenido-modal">
        <button className="cerrar-modal" onClick={cerrarModal}>
          ✖
        </button>
        <img src={producto.imagen} alt={producto.nombre} className="imagen-modal" />
        <h2>{producto.nombre}</h2>
        <p className="precio-modal">${producto.precio}</p>
        <p className="descripcion-modal">{producto.descripcion}</p>
        <ul className="detalles-modal">
          <li><strong>Ingredientes:</strong> {producto.ingredientes}</li>
          <li><strong>Uso:</strong> {producto.uso}</li>
        </ul>
        <button className="añadir-carrito">Añadir al carrito</button>
      </div>
    </div>
  );
}

export default ModalProducto;
