import React from "react";
import { useNavigate } from "react-router-dom";

function MYC() {
  const navigate = useNavigate();

  const marcas = [
    { id: 1, nombre: "Marca 1", imagen: "img/A2.png" },
    { id: 2, nombre: "Marca 2", imagen: "img/10.png" },
    { id: 3, nombre: "Marca 3", imagen: "img/7.png" },
  ];

  const categorias = [
    { id: 1, nombre: "Cuidado de la Piel", ruta: "/cuidadopiel" },
    { id: 2, nombre: "Cuidado del Cabello", ruta: "/cuidadocabello" },
    { id: 3, nombre: "Maquillaje", ruta: "/maquillaje" },
    { id: 4, nombre: "Ofertas", ruta: "/ofertas" },
  ];

  const handleNavigation = (ruta) => {
    navigate(ruta);
  };

  return (
    <section className="brands-categories">
      {/* Marcas Destacadas */}
      <div className="brands">
        <h2>Marcas Destacadas</h2>
        <div className="brand-list">
          {marcas.map((marca) => (
            <div className="brand-card" key={marca.id}>
              <img src={marca.imagen} alt={marca.nombre} className="brand-image" />
              <p className="brand-name">{marca.nombre}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías Recomendadas */}
      <div className="categories">
        <h2>Categorías Recomendadas</h2>
        <div className="category-list">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              className="category-btn"
              onClick={() => handleNavigation(categoria.ruta)}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MYC;
