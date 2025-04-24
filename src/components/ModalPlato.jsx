import React, { useEffect } from 'react';

const ModalPlato = ({ plato, cerrar }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('plato')) cerrar();
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [cerrar]);

  return (
    <div id="plato" className="plato" style={{ display: 'flex' }}>
      <div className="plato-contenido">
        <h3>{plato.titulo}</h3>
        <img src={plato.img} alt={plato.titulo} />
        <p className="descripcionDetalle">{plato.descripcion}</p>
        <p className="ingredientesDetalle"><strong>Ingredientes:</strong> {plato.ingredientes}</p>
        <p className="alergenoDetalle"><strong>Alérgenos:</strong> {plato.alergenos}</p>
        <p className="precioDetalle">{plato.precio}</p>
      </div>
    </div>
  );
};

export default ModalPlato;
