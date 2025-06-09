import './App.css';   
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Carrusel from './components/Carrusel';
import ProDestacados from './components/ProDestacados';
import CombosProductos from './components/CombosProductos';
import Pie from './components/Pie';
import MYC from './components/MYC';
import Productos from './Productos';
import Carrito from './components/Carrito';
import CuidadoPiel from "./CuidadoPiel"; 
import CuidadoCabello from "./CuidadoCabello"; 
import Maquillaje from "./Maquillaje";
import Favoritos from "./components/Favoritos";
import Login from "./auth/Login";
import AdminLogin from "./auth/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import PedidosUsuarios from "./components/PedidosUsuarios";
import { CarritoProvider } from './components/CarritoContext';
import { AuthProvider } from './auth/AuthContext';
import PerfilUsuario from './components/PerfilUsuario';
import HistorialCompras from './components/HistorialCompras';
import Register from "./auth/Register"; // Asegúrate de que la ruta sea correcta

function RegisterPage() {
  return (
    <div className="App">
      <Header />
      <Register />
      <Pie />
    </div>
  );
}
// Páginas adicionales
function PerfilUsuarioPage() {
  return (
    <div className="App">
      <Header />
      <PerfilUsuario />
      <Pie />
    </div>
  );
}

function HistorialComprasPage() {
  return (
    <div className="App">
      <Header />
      <HistorialCompras />
      <Pie />
    </div>
  );
}

// Páginas existentes
function FavoritosPage() {
  return (
    <div className="App">
      <Header />
      <Favoritos />
      <Pie />
    </div>
  );
}

function HomePage() {
  return (
    <div className="App">
      <Header />
      <Carrusel />
      <ProDestacados />
      <CombosProductos />
      <MYC />
      <Pie />
    </div>
  );
}

function ProductPage() {
  return (
    <div className="App">
      <Header />
      <Productos />
      <Pie />
    </div>
  );
}

function CarritoPage() {
  return (
    <div className="App">
      <Header />
      <Carrito />
      <Pie />
    </div>
  );
}

function CuidadoPielPage() {
  return (
    <div className="App">
      <Header />
      <CuidadoPiel />
      <Pie />
    </div>
  );
}

function CuidadoCabelloPage() {
  return (
    <div className="App">
      <Header />
      <CuidadoCabello />
      <Pie />
    </div>
  );
}

function MaquillajePage() {
  return (
    <div className="App">
      <Header />
      <Maquillaje />
      <Pie />
    </div>
  );
}

function AdminPanelPage() {
  return (
    <div className="App">
      <AdminPanel />
      <Pie />
    </div>
  );
}

function PedidosUsuariosPage() {
  return (
    <div className="App">
      <Header />
      <PedidosUsuarios />
      <Pie />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/cuidadopiel" element={<CuidadoPielPage />} />
            <Route path="/cuidadocabello" element={<CuidadoCabelloPage />} />
            <Route path="/maquillaje" element={<MaquillajePage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/mis-pedidos" element={<PedidosUsuariosPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            {/* Nuevas rutas (accesibles sin login) */}
            <Route path="/perfil" element={<PerfilUsuarioPage />} />
            <Route path="/historial-compras" element={<HistorialComprasPage />} />

            {/* Ruta protegida solo para Admin */}
            <Route path="/admin" element={<AdminPanelPage />} />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
