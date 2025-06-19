import React, { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${apiUrl}/AdminAuth/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.usuario);
                }
                else if (response.status === 404) {
                    const response = await fetch(`${apiUrl}/AdminAuth/refresh`, {
                        method: "POST",
                        credentials: "include",
                    });
                }
                else {
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
            const response = await fetch(`${apiUrl}/AdminAuth/login`, {
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
            const response = await fetch(`${apiUrl}/AdminAuth/logout`, {
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
        <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAuth = () => useContext(AdminAuthContext);