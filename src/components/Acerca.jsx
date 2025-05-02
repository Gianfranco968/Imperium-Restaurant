import React from 'react';

export default function Acerca() {
    return (
        <div className="acerca menu">
        <h1 id="acerca">Nosotros</h1>
            <div className="acerca_contenido">
                <img src='/img/clientes.jpg' alt='Clientes' className='imgAcerca' width="315px" height="350px" />
                <p className='infoAdicional'>En Imperium Restaurant, nos enorgullece ofrecer una experiencia única que combina la alta cocina con un ambiente elegante. <br /> <br />
                    Nuestro equipo de chefs apasionados trabaja incansablemente para crear platos innovadores que deleiten tus sentidos y te transporten a un mundo de sabores exquisitos. <br /> <br />
                    Ya sea que estés celebrando una ocasión especial o simplemente buscando disfrutar de una comida excepcional, estamos aquí para hacer de tu visita una experiencia inolvidable.</p>
            </div>
        </div>
    );
}