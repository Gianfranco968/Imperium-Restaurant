import React from 'react';

export default function Contacto() {
    return (
        <div className="contacto menu">
            <h1 id="contacto">Contacto</h1>
            <div className='direccion'>
                <p className='infoAdicional'>Av. de los Shyris N34-123 y Av. Eloy Alfaro, Quito, Ecuador</p>
            </div>
            <iframe className='mapa'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.083352848006!2d-78.4873!3d-0.1919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b1710d867f1%3A0xa4ea9139b349eab9!2sImperium%20Restaurante!5e0!3m2!1ses-419!2sec!4v1714674446017!5m2!1ses-419!2sec"
                width="80%"
                height="350px"
                style={{ border: 0 }}
                allowFullScreen="disabled"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Imperium Restaurante"
            />
            <div className='descripcion info'>
                <p><strong>Horario</strong>: Martes a Sabado, 12:30hs - 15:30hs // 18:00hs - 22:00hs</p>
                <p><strong>Teléfono</strong>: 0990645271</p>
            </div>
            <div class="redes-sociales">
                <a href="https://www.facebook.com/imperiumrestaurante.ec/?locale=es_LA" className="red-social" target="_blank" rel="noopener noreferrer">
                    <img src="/img/icon-facebook.svg" alt="Facebook" width="35" />
                </a>
                <a href="https://www.instagram.com/imperiumrestaurante.ec/?hl=es" className="red-social" target="_blank" rel="noopener noreferrer">
                    <img src="/img/icon-instagram.svg" alt="Instagram" width="35" />
                </a>
                <a href="https://x.com/RestImperium" className="red-social" target="_blank" rel="noopener noreferrer">
                    <img src="/img/icon-x.svg" alt="Twitter ('X')" width="35" />
                </a>
            </div>
        </div>
    );
}

