import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
  const meEndpoint = `${apiUrl}/Auth/me`;
  const refreshEndpoint = `${apiUrl}/AdminAuth/refresh`;

  try {
    let response = await fetch(meEndpoint, {
      method: "GET",
      credentials: "include",
    });

    console.log("Estado me:", response.status);

    if (response.ok) {
      const data = await response.json();
      setUser(data.usuario);
    } else if (response.status === 401) {
      console.log("Token expirado. Intentando refresh...");

      const refreshResponse = await fetch(refreshEndpoint, {
        method: "POST",
        credentials: "include",
      });

      console.log("Estado refresh:", refreshResponse.status);

      if (refreshResponse.ok) {
        response = await fetch(meEndpoint, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.usuario);
        } else {
          console.warn("No se pudo recuperar el usuario después del refresh.");
          setUser(null);
        }
      } else {
        console.warn("Refresh token inválido o expirado.");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, contraseña: password }),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      setUser(data.usuario);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${apiUrl}/Auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

      setUser(null);

    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
