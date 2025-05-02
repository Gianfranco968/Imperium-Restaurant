// Importación de React y del hook useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';

// Componente funcional que recibe:
// - plato: objeto con la información del plato a mostrar
// - cerrar: función para cerrar el modal
const ModalPlato = ({ plato, cerrar }) => {

  // Efecto que se ejecuta al montar el componente y se limpia al desmontar
  useEffect(() => {
    // Función que cierra el modal si el usuario hace clic fuera del contenido
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('plato')) cerrar();
    };

    // Se agrega el listener al hacer clic en cualquier parte de la ventana
    window.addEventListener('click', handleClickOutside);

    // Limpieza del efecto: se remueve el listener al desmontar el componente
    return () => window.removeEventListener('click', handleClickOutside);
  }, [cerrar]); // Se vuelve a crear el efecto solo si 'cerrar' cambia

  return (
    // Fondo oscuro con clase 'plato', actúa como envoltorio del modal
    <div id="plato" className="plato" style={{ display: 'flex' }}>
      
      {/* Contenido del modal */}
      <div className="plato-contenido">
        {/* Título del plato */}
        <h3>{plato.titulo}</h3>

        {/* Imagen del plato */}
        <img src={plato.img} alt={plato.titulo} />

        {/* Descripción del plato */}
        <p className="descripcionDetalle">{plato.descripcion}</p>

        {/* Lista de ingredientes */}
        <p className="ingredientesDetalle">
          <strong>Ingredientes:</strong> {plato.ingredientes}
        </p>

        {/* Información sobre alérgenos */}
        <p className="alergenoDetalle">
          <strong>Alérgenos:</strong> {plato.alergenos}
        </p>

        {/* Precio del plato */}
        <p className="precioDetalle">{plato.precio}</p>
      </div>
    </div>
  );
};

// Exportación del componente para ser utilizado en otras partes de la app
export default ModalPlato;

