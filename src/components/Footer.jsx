// Importación de React para crear el componente funcional
import React from 'react';

// Componente funcional que representa el pie de página (footer)
const Footer = () => (
  // Contenedor del pie de página
  <footer className="footer" id='contacto'>

    {/* Contenedor del contenido dentro del footer */}
    <div className="footer-contenido">
      {/* Texto de derechos de autor con el nombre del restaurante y un eslogan */}
      <p>&copy; 2025 Imperium Restaurant - Alta cocina en sombras</p>
    </div>

  </footer>
);

// Exportación del componente Footer para usarlo en otras partes de la aplicación
export default Footer;
