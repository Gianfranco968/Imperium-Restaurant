import React, { useState } from 'react';
import Producto from './Producto';

const Categoria = ({ data, mostrarDetallePlato }) => {
    const [abierta, setAbierta] = useState(false);

    const toggleCategoria = () => setAbierta(!abierta);

    return (
        <section className={`categoria ${data.lado} ${abierta ? 'abierta' : ''}`}>
            <div className={`categoria_boton ${data.lado}`} >
                <h2>{data.titulo}</h2>
                <h3 onClick={toggleCategoria}>{abierta ? 'Ver menos' : 'Ver más'}</h3>

                {abierta &&
                    data.productos.map((producto, i) => (
                        <Producto
                            key={i}
                            data={producto}
                            lado={data.lado}
                            mostrarDetallePlato={mostrarDetallePlato}
                        />
                    ))}
            </div>
        </section>

    );
};

export default Categoria;
