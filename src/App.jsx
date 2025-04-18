import React, { useState } from 'react';
import Intro from './components/Intro';
import Categoria from './components/Categoria';
import ModalPlato from './components/ModalPlato';
import Footer from './components/Footer';
import categoriasData from './data/categorias.json';
import './styles/style.css';

function App() {
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

  const mostrarDetallePlato = (plato) => setPlatoSeleccionado(plato);
  const cerrarDetallePlato = () => setPlatoSeleccionado(null);

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

      {/* Contenido */}
      <main>
        <Intro />
        <div className="menu">
          {categoriasData.map((categoria, index) => (
            <Categoria
              key={index}
              data={categoria}
              mostrarDetallePlato={mostrarDetallePlato}
            />
          ))}
        </div>
        <Footer />
        {platoSeleccionado && (
          <ModalPlato plato={platoSeleccionado} cerrar={cerrarDetallePlato} />
        )}
      </main>
    </div>
  );
}

export default App;
