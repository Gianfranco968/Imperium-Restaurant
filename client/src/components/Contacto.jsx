// Importación de React
import React from 'react';

// Componente funcional Contacto que muestra la información de contacto y ubicación del restaurante
export default function Contacto() {
    return (
        // Contenedor principal con clases para aplicar estilos generales
        <div className="contacto menu">

            {/* Título de la sección de contacto */}
            <h1 id="contacto">Contacto</h1>

            {/* Dirección física del restaurante */}
            <div className='direccion'>
                <p className='infoAdicional'>
                    Av. de los Shyris N34-123 y Av. Eloy Alfaro, Quito, Ecuador
                </p>
            </div>

            {/* Mapa incrustado de Google Maps para mostrar la ubicación */}
            <iframe className='mapa'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.083352848006!2d-78.4873!3d-0.1919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b1710d867f1%3A0xa4ea9139b349eab9!2sImperium%20Restaurante!5e0!3m2!1ses-419!2sec!4v1714674446017!5m2!1ses-419!2sec"
                width="80%"                          // Ancho del mapa
                height="350px"                      // Alto del mapa
                style={{ border: 0 }}               // Sin borde
                allowFullScreen="disabled"         // No permite pantalla completa
                loading="lazy"                     // Carga diferida para mejor rendimiento
                referrerPolicy="no-referrer-when-downgrade" // Política de referencia segura
                title="Ubicación de Imperium Restaurante"  // Descripción para accesibilidad
            />

            {/* Descripción con horario y teléfono */}
            <div className='descripcion info'>
                <p><strong>Horario</strong>: Martes a Sabado, 12:30hs - 15:30hs // 18:00hs - 22:00hs</p>
                <p><strong>Teléfono</strong>: 
                    <a href='https://api.whatsapp.com/send?phone=593990645271'> 
                        (+593) 99-064-5271 
                    </a> 
                </p> 
            </div>

            {/* Sección de redes sociales con iconos y enlaces */}
            <div className="redes-sociales">
                {/* Enlace a WhatsApp */}
                <a 
                    href="https://api.whatsapp.com/send?phone=593990645271"
                    className="red-social"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/img/icon-whatsapp.svg" alt="WhatsApp" width="35" />
                </a>

                {/* Enlace a Instagram */}
                <a 
                    href="https://www.instagram.com/imperiumrestaurante.ec/?hl=es"
                    className="red-social"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/img/icon-instagram.svg" alt="Instagram" width="35" />
                </a>

                {/* Enlace a Facebook */}
                <a 
                    href="https://www.facebook.com/imperiumrestaurante.ec/?locale=es_LA"
                    className="red-social"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/img/icon-facebook.svg" alt="Facebook" width="35" />
                </a>

                {/* Enlace a X */}
                <a 
                    href="https://x.com/RestImperium"
                    className="red-social"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/img/icon-x.svg" alt="Twitter ('X')" width="35" />
                </a>
            </div>
        </div>
    );
}


