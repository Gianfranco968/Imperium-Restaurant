import React from 'react';

const Producto = ({ data, lado, mostrarDetallePlato }) => {
  return (
    <div className={`producto ${lado}`} onClick={() => mostrarDetallePlato(data)}>
      <div className={`contenido ${lado === 'izq' ? 'orden' : ''}`}>
        <img src={data.img} alt={data.titulo} className="producto-imagen" />
        <div className={`desc_plato ${lado === 'izq' ? 'izquierda' : ''}`}>
          <h3>{data.titulo}</h3>
          <p className="descripcion">{data.descripcion}</p>
          <div className="infoAdicional">
            <p><strong>Ingredientes:</strong> {data.ingredientes}</p>
            <p><strong>Alérgenos:</strong> {data.alergenos}</p>
          </div>
        </div>
      </div>
      <p className="precio">{data.precio}</p>
    </div>
  );
};

export default Producto;
