import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem("favoritos");
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Guardar en localStorage cuando cambien los favoritos
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const toggleFavorito = (producto) => {
    setFavoritos((prevFavoritos) => {
      if (prevFavoritos.some((fav) => fav.id === producto.id)) {
        // Si ya existe, lo eliminamos
        return prevFavoritos.filter((fav) => fav.id !== producto.id);
      } else {
        // Si no existe, lo agregamos
        return [...prevFavoritos, producto];
      }
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        favoritos,
        toggleFavorito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
