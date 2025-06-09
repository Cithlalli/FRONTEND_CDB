import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "./CarritoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faHistory, 
  faSignOutAlt,
  faShoppingCart,
  faHeart,
  faTruck,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../auth/AuthContext"; // Ruta corregida

function Header() {
  const { carrito, favoritos } = useContext(CarritoContext);
  const { user, logout } = useAuth();
  const [busqueda, setBusqueda] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?buscar=${busqueda}`);
      setBusqueda("");
    }
  };

  const handleProfileNavigation = () => {
    setShowUserMenu(false);
    navigate("/perfil");
  };

  const handleOrderHistory = () => {
    setShowUserMenu(false);
    navigate("/historial-compras");
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <header className="navigation-bar">
      <div className="nav-left">
        <img src="../imgen/Logo.png" alt="Logo" className="logo-img" />
        <span className="store-name">Mi Estilo</span>
      </div>
      
      <div className="nav-center">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/cuidadopiel">Cuidado de la Piel</Link>
        <Link to="/cuidadocabello">Cuidado del Cabello</Link>
        <Link to="/maquillaje">Maquillaje</Link>
        <Link to="/perfil">Perfil</Link>
  <Link to="/historial-compras">Historial</Link>
  <Link to="/login">Login</Link>
      </div>

      <div className="nav-right">
        <form className="search-bar" onSubmit={manejarBusqueda}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        <div className="nav-icons">
          {/* Ícono de Favoritos */}
          <div className="icon-container" onClick={() => navigate("/favoritos")}>
            <FontAwesomeIcon icon={faHeart} />
            {favoritos.length > 0 && <span className="badge">{favoritos.length}</span>}
          </div>

          {/* Menú de Usuario */}
          <div className="user-menu-container">
            <div 
              className="icon-container" 
              onClick={() => user ? setShowUserMenu(!showUserMenu) : navigate("/login")}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            
            {user && showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-info">
                  <p>Hola, {user.nombre}</p>
                  <small>{user.correo}</small>
                </div>
                <button onClick={handleProfileNavigation}>
                  <FontAwesomeIcon icon={faUser} /> Mi Perfil
                </button>
                <button onClick={handleOrderHistory}>
                  <FontAwesomeIcon icon={faHistory} /> Historial
                </button>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Ícono de Carrito */}
          <div className="icon-container" onClick={() => navigate("/carrito")}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {carrito.length > 0 && <span className="badge">{carrito.length}</span>}
          </div>

          {/* Ícono de Pedidos */}
          <div className="icon-container" onClick={() => navigate("/mis-pedidos")}>
            <FontAwesomeIcon icon={faTruck} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;