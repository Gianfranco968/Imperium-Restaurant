// Importación de React para crear el componente funcional
import React from 'react';

// Componente funcional que muestra información sobre el restaurante
export default function Acerca() {
    return (
        // Contenedor principal con clase 'acerca' para aplicar estilos
        <div className="acerca menu">

            {/* Título de la sección "Nosotros" */}
            <h1 id="acerca">Nosotros</h1>

            {/* Contenedor de la información sobre el restaurante */}
            <div className="acerca_contenido">

                {/* Imagen representativa de los clientes, con dimensiones fijas */}
                <img
                    src='/img/clientes.jpg'
                    alt='Clientes'
                    className='imgAcerca'
                    width="315px"
                    height="350px"
                />

                {/* Descripción del restaurante */}
                <p className='infoAdicional'>
                    En Imperium Restaurant, nos enorgullece ofrecer una experiencia única que combina la alta cocina con un ambiente elegante. <br /> <br />
                    Nuestro equipo de chefs apasionados trabaja incansablemente para crear platos innovadores que deleiten tus sentidos y te transporten a un mundo de sabores exquisitos. <br /> <br />
                    Ya sea que estés celebrando una ocasión especial o simplemente buscando disfrutar de una comida excepcional, estamos aquí para hacer de tu visita una experiencia inolvidable.
                </p>

            </div>
            {/* Contenedor de la información sobre el restaurante */}
            <div className="acerca_contenido der">

                {/* Imagen representativa de los platos, con dimensiones fijas */}
                <img
                    src='/img/propuesta.png'
                    alt='Clientes'
                    className='imgAcerca'
                    width="315px"
                    height="350px"
                />

                {/* Descripción del restaurante */}
                <p className='infoAdicional'>
                    Cada plato es una obra maestra creada con ingredientes frescos y de la más alta calidad. <br /> <br />
                    Nuestro menú está cuidadosamente diseñado para ofrecer una variedad de sabores que fusionan lo clásico con lo contemporáneo, brindando una experiencia gastronómica única en cada bocado. <br /> <br />
                    Ya sea que prefieras un plato ligero o una experiencia más robusta, nuestros chefs se aseguran de que cada plato sea una expresión de creatividad y pasión. <br /> <br />
                    Veni a disfrutar de una cocina que no solo satisface, sino que también sorprende y encanta a cada uno de nuestros comensales.
                </p>
            </div>
        </div>
    );
}
