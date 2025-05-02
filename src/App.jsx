// Importación de React y el hook useState para manejar estados locales
import React, { useState } from 'react';

// Importación de componentes personalizados
import Intro from './components/Intro';              // Sección de introducción del sitio
import Categoria from './components/Categoria';      // Componente que renderiza una categoría de platos
import ModalPlato from './components/ModalPlato';    // Modal que muestra los detalles de un plato
import MobileMenu from './components/Menu';          // Menú interactivo para dispositivos móviles
import Footer from './components/Footer';            // Pie de página
import Contacto from './components/Contacto';        // Sección de contacto
import Acerca from './components/Acerca';            // Sección "Acerca de nosotros"

// Datos de las categorías de platos importados desde un archivo JSON
import categoriasData from './data/categorias.json';

// Estilos globales del proyecto
import './styles/style.css';

function App() {
  // Estado para almacenar el plato seleccionado al hacer clic
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

  // Función que se ejecuta al seleccionar un plato, abre los detalles
  const mostrarDetallePlato = (plato) => setPlatoSeleccionado(plato);

  // Función que cierra el detalle del plato al hacer clic fuera
  const cerrarDetallePlato = () => setPlatoSeleccionado(null);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      
      {/* Imagen de fondo fija y semi-transparente, cubriendo toda la pantalla */}
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
          zIndex: -1, // Se coloca detrás del contenido
        }}
      ></div>

      {/* Contenido principal de la aplicación */}
      <main>
        {/* Menú móvil posicionado en la parte superior derecha */}
        <div className="mobile-menu" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <MobileMenu />
        </div>

        {/* Sección introductoria */}
        <Intro />

        {/* Sección acerca del restaurante */}
        <Acerca />

        {/* Sección del menú de platos, generada dinámicamente desde los datos */}
        <div className="menu">
          <h1 id="carta"> Nuestra carta </h1>
          {categoriasData.map((categoria, index) => (
            <Categoria
              key={index}                        // Clave única para cada categoría
              data={categoria}                   // Datos de la categoría (nombre, platos, etc.)
              mostrarDetallePlato={mostrarDetallePlato}  // Función que se pasa como prop para mostrar el modal
            />
          ))}
        </div>

        {/* Sección de contacto */}
        <Contacto />

        {/* Pie de página */}
        <Footer />

        {/* Modal que aparece solo si hay un plato seleccionado */}
        {platoSeleccionado && (
          <ModalPlato 
            plato={platoSeleccionado}           // Información del plato a mostrar
            cerrar={cerrarDetallePlato}         // Función para cerrar el modal
          />
        )}
      </main>
    </div>
  );
}

// Exportación del componente App para usarlo en index.js
export default App;
