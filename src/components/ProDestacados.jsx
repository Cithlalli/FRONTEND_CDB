import React from 'react';

function Proddestacado(){
      const productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción breve del producto 1',
      imagen: 'img/A2.png',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción breve del producto 2',
      imagen: 'img/A12.jpg',
    },
    // Agrega más productos según sea necesario
  ];

  return (
    <section className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="product-list">
        {productos.map((prod) => (
          <div className="product-card" key={prod.id}>
            <img src={prod.imagen} alt={prod.nombre} />
            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Proddestacado;
