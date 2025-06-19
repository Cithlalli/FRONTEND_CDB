import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [favoritos, setFavoritos] = useState([]);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`${apiUrl}/Carritos`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        //console.log(data);
        setCarrito(data);
      }
      catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchCar();
  }, [carrito]);

  // Guardar en localStorage cuando cambien los favoritos
  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await fetch(`${apiUrl}/ListasDeseos`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        setFavoritos(data);
      }
      catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchFav();
  }, [favoritos]);

  const agregarAlCarrito = async (producto) => {
    try {
      const body = {
        IdProducto : producto.idProducto,
        Cantidad : 1,
      }

      const response = await fetch(`${apiUrl}/Carritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include"
      });
    }
    catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const toggleFavorito = async (producto) => {
    try {
      const body = {
        IdProducto : producto.idProducto,
        Activo : true,
      }

      const response = await fetch(`${apiUrl}/ListasDeseos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include"
      });
    }
    catch (error) {
      console.error("Error al obtener los productos:", error);
    }
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
