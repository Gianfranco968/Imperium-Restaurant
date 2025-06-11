import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EliminarPlato = () => {
    const [platos, setPlatos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const token = localStorage.getItem('token'); // ✅ Token para autorización

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/platos', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPlatos(res.data);
            } catch (err) {
                setMensaje(`❌ Error al cargar el plato: ${err.response?.data?.message || err.message}`);
            }
        };

        fetchPlatos();
    }, [token]);

    const handleDelete = async id => {
        try {
            await axios.delete(`http://localhost:5001/api/platos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPlatos(prev => prev.filter(plato => plato._id !== id));
            setMensaje('✅ Plato eliminado correctamente');
        } catch (err) {
            setMensaje(`❌ Error al eliminar el plato: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className='eliminar-plato'>
            <h3 className='titulo'>Eliminar Plato</h3>
            <div className='usuarios-list'>
                <ul>
                    {platos.map(plato => (
                        <li key={plato._id} className='usuarios-individuales'>
                            {plato.titulo} - {plato.categoria}
                            <button onClick={() => handleDelete(plato._id)} className='deletePlato'>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default EliminarPlato;