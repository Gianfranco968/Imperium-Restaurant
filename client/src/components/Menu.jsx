// Importación de useState para manejar el estado del menú
import { useState } from "react";
// Importación de iconos de lucide-react para los botones del menú
import { X, Menu } from "lucide-react";
// Importación de motion y AnimatePresence de framer-motion para animaciones
import { motion, AnimatePresence } from "framer-motion";

// Componente funcional para el menú iteractivo
export default function MobileMenu() {
    // Estado que determina si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);

    // Variantes de animación para los enlaces del menú
    const linkVariants = {
        hidden: { opacity: 0, x: 20 }, // Estado oculto (desaparece)
        visible: (i) => ({ // Estado visible (aparece con un retraso)
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 }, // Retraso progresivo para cada enlace
        }),
    };

    // Definición de los enlaces del menú
    const links = [
        { label: "Inicio", href: "#intro" },
        { label: "Nosotros", href: "#acerca" },
        { label: "Carta", href: "#carta" },
        { label: "Contacto", href: "#contacto" }
    ];

    return (
        // Contenedor principal para el botón del menú y el panel
        <div className="menu-toggle-container">
            {/* Botón para abrir y cerrar el menú */}
            <button
                onClick={() => setIsOpen(!isOpen)} // Cambia el estado del menú al hacer clic
                className="menu-toggle-button"
            >
            <p className="boton_menu_info"> MENÚ </p>
                {/* Muestra el icono X si el menú está abierto, de lo contrario muestra el icono de menú */}
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Animación del menú utilizando AnimatePresence */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Fondo semitransparente que aparece cuando el menú está abierto */}
                        <motion.div
                            className="menu-backdrop"
                            initial={{ opacity: 0 }} // Inicia invisible
                            animate={{ opacity: 1 }} // Se hace visible al abrir el menú
                            exit={{ opacity: 0 }} // Se oculta al cerrar el menú
                            onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en el fondo
                        />

                        {/* Panel del menú que se desliza desde la derecha */}
                        <motion.div
                            initial={{ x: "100%" }} // Inicia fuera de la pantalla (a la derecha)
                            animate={{ x: 0 }} // Se desliza a la posición original
                            exit={{ x: "100%" }} // Vuelve a salir hacia la derecha al cerrarse
                            transition={{ type: "spring", stiffness: 300, damping: 30 }} // Configuración de la animación
                            className="menu-panel"
                        >
                            {/* Navegación del menú */}
                            <nav className="menu-nav">
                                {/* Itera sobre los enlaces y los muestra con animación */}
                                {links.map(({ label, href }, index) => (
                                    <motion.a
                                        key={label} // Clave única para cada enlace
                                        href={href} // Enlace de navegación
                                        onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en un enlace
                                        className="menu-link"
                                        custom={index} // Se pasa el índice para la animación personalizada
                                        initial="hidden" // Inicia en estado oculto
                                        animate="visible" // Se anima a estado visible
                                        exit="hidden" // Se vuelve a ocultar al salir
                                        variants={linkVariants} // Variantes de animación para los enlaces
                                    >
                                        {label} {/* Etiqueta del enlace */}
                                    </motion.a>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
