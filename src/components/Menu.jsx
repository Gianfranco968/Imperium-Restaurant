import { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const linkVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 },
        }),
    };

    const links = [
        { label: "Inicio", href: "#intro" },
        { label: "Menú", href: "#carta" },
        { label: "Acerca de", href: "#acerca" },
        { label: "Contacto", href: "#contacto" },
    ];

    return (
        <div className="menu-toggle-container">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="menu-toggle-button"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="menu-panel"
                        >
                            <nav className="menu-nav">
                                {links.map(({ label, href }, index) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="menu-link"
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={linkVariants}
                                    >
                                        {label}
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
