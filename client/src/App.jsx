import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from './components/Intro';
import Categoria from './components/Categoria';
import ModalPlato from './components/ModalPlato';
import MobileMenu from './components/Menu';
import Footer from './components/Footer';
import Contacto from './components/Contacto';
import Acerca from './components/Acerca';
import LoginSection from './components/LoginSection';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import AdminApp from './components/AdminApp'; 

import './styles/style.css';

function MainApp() {
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const mostrarDetallePlato = (plato) => setPlatoSeleccionado(plato);
  const cerrarDetallePlato = () => setPlatoSeleccionado(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/platos');
      const platos = await res.json();

      // Agrupar los platos por categoría
      const categoriasAgrupadas = {};
      platos.forEach(plato => {
        const categoria = plato.categoria || 'Sin Categoría';
        if (!categoriasAgrupadas[categoria]) {
          categoriasAgrupadas[categoria] = {
            titulo: categoria,
            productos: [],
          };
        }

        categoriasAgrupadas[categoria].productos.push({
          titulo: plato.titulo,
          descripcion: plato.descripcion,
          ingredientes: plato.ingredientes,
          alergenos: plato.alergenos,
          precio: `$${plato.precio}`,
          img: `http://localhost:5001/img/${plato.img || 'default.webp'}`,
        });
      });

      // Convertir objeto en array y asignar lado alternado
      const categoriasArray = Object.values(categoriasAgrupadas).map((cat, index) => ({
        ...cat,
        lado: index % 2 === 0 ? 'izq' : 'der',
      }));

      setCategorias(categoriasArray);
    } catch (error) {
      console.error('Error al obtener los platos:', error);
    }
  };

  fetchData();
}, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <div
        style={{
          content: '""',
          backgroundImage: `url(${process.env.PUBLIC_URL + '/img/restaurant_demo.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      ></div>

      <main>
        <button className='subir'>
          <a href="#intro" className="boton_volver">
            <img src="/img/icon-arrow.svg" alt="Subir" loading="lazy" width="50" />
          </a>
        </button>

        <div className="mobile-menu" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <MobileMenu />
        </div>

        <Intro />
        <Acerca />

        <div className="menu">
          <h1 id="carta">Nuestra carta</h1>
          {categorias.map((categoria, index) => (
            <Categoria
              key={index}
              data={categoria}
              mostrarDetallePlato={mostrarDetallePlato}
            />
          ))}
        </div>

        <Contacto />
        <Footer />

        {platoSeleccionado && (
          <ModalPlato 
            plato={platoSeleccionado}
            cerrar={cerrarDetallePlato}
          />
        )}
      </main>
    </div>
  );
}

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/admin" element={<LoginSection />} />
      <Route path="/admin/panel" element={
        <ProtectedRoute requiredRoles={['admin', 'superadmin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />
      <Route path="/admin/test" element={<AdminApp />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
