import React from 'react';

function Paginacion({ paginaActual, totalPaginas, cambiarPagina, cambiarElementosPorPagina }) {
  return (
    <div className="contenedor-paginacion">
      <button
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="boton-paginacion"
      >
        Anterior
      </button>
      <span className="info-paginacion">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="boton-paginacion"
      >
        Siguiente
      </button>
      <select
        onChange={(e) => cambiarElementosPorPagina(parseInt(e.target.value))}
        className="selector-elementos-pagina"
      >
        <option value="4">4 productos por página</option>
        <option value="8">8 productos por página</option>
        <option value="12">12 productos por página</option>
      </select>
    </div>
  );
}

export default Paginacion;
