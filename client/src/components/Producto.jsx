// Importación de React para crear el componente funcional
import React from 'react';

// Componente funcional que muestra la información de un solo producto (plato)
const Producto = ({ data, lado, mostrarDetallePlato }) => {

  return (
    // Contenedor principal del producto, con clase dinámica para aplicar estilos basados en la posición
    <div className={`producto ${lado}`} onClick={() => mostrarDetallePlato(data)}>

      {/* Contenedor del contenido del producto */}
      <div className={`contenido ${lado === 'izq' ? 'orden' : ''}`}>

        {/* Imagen del producto (plato) */}
        <img src={data.img} alt={data.titulo} className="producto-imagen" />

        {/* Descripción del producto */}
        <div className={`desc_plato ${lado === 'izq' ? 'izquierda' : ''}`}>
          {/* Título del plato */}
          <h3>{data.titulo}</h3>

          {/* Descripción breve del plato */}
          <p className="descripcion">{data.descripcion}</p>

          {/* Información adicional sobre el plato (ingredientes y alérgenos) */}
          <div className="infoAdicional">
            <p><strong>Ingredientes:</strong> {data.ingredientes}</p>
            <p><strong>Alérgenos:</strong> {data.alergenos}</p>
          </div>
        </div>
      </div>

      {/* Precio del plato */}
      <p className="precio">{data.precio}</p>
    </div>
  );
};

// Exportación del componente Producto para ser utilizado en otras partes de la app
export default Producto;

