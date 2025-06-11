// Importación de React y useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';
// Importación del logo de la marca desde los activos
import brandLogo from '../assets/img/brand_logo.png';

// Componente funcional que representa la pantalla de introducción
const Intro = () => {

  // useEffect se ejecuta cuando el componente se carga (solo una vez)
  useEffect(() => {
    // Después de 500ms, se agrega la clase 'visible' al elemento con id 'intro'
    setTimeout(() => {
      document.getElementById('intro').classList.add('visible');
    }, 500);
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  return (
    // Contenedor de la introducción
    <div className="intro" id="intro">
      {/* Imagen del logo del restaurante */}
      <img src={brandLogo} alt="Logo del Restaurant" />
    </div>
  );
};

// Exportación del componente Intro para que pueda ser utilizado en otras partes de la aplicación
export default Intro;

