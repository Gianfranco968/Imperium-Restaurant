// Importación de React y el hook useState para manejar el estado local
import React, { useState } from 'react';

// Importación del componente Producto que se utilizará para mostrar cada plato dentro de la categoría
import Producto from './Producto';

// Componente funcional que muestra una categoría de productos (platos)
const Categoria = ({ data, mostrarDetallePlato }) => {

  // Estado local que indica si la categoría está abierta o cerrada (para mostrar los productos)
  const [abierta, setAbierta] = useState(false);

  // Función que cambia el estado de 'abierta' al hacer clic en el botón "Ver más" o "Ver menos"
  const toggleCategoria = () => setAbierta(!abierta);

  return (
    // Contenedor de la categoría con clases dinámicas para manejar estilos específicos
    <section className={`categoria ${data.lado} ${abierta ? 'abierta' : ''}`}>

      {/* Contenedor del botón de la categoría */}
      <div className={`categoria_boton ${data.lado}`} >

        {/* Título de la categoría */}
        <h2>{data.titulo}</h2>

        {/* Botón que permite abrir o cerrar la categoría */}
        <h3 onClick={toggleCategoria}>{abierta ? 'Ver menos' : 'Ver más'}</h3>

        {/* Muestra los productos de la categoría solo si está abierta */}
        {abierta &&
          // Iteración sobre los productos de la categoría y renderización del componente Producto
          data.productos.map((producto, i) => (
            <Producto
              key={i}                             // Clave única para cada producto
              data={producto}                     // Datos del producto (plato)
              lado={data.lado}                    // Información adicional sobre la posición de la categoría
              mostrarDetallePlato={mostrarDetallePlato}  // Función que muestra el detalle del plato al hacer clic
            />
          ))}
      </div>
    </section>
  );
};

// Exportación del componente Categoria para usarlo en otras partes de la aplicación
export default Categoria;

