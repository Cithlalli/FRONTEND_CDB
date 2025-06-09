import React from 'react';

function Filtros({ onFiltroChange }) {
  const categorias = [
    'Limpiadores Faciales',
    'Tónicos',
    'Serums y Ampolletas',
    'Protección Solar',
    'Cuidado del Contorno de Ojos',
    'Hidratantes y Cremas',
    'Cuidado del Cabello',
    'Maquillaje',
    'Accesorios',
  ];

  return (
    <div className="filtros">
      <h3>Filtrar por Categoría</h3>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>
            <button onClick={() => onFiltroChange(categoria)}>{categoria}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Filtros;
