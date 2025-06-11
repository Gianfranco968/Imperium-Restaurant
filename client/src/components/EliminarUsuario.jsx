import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EliminarUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const currentUserId = localStorage.getItem('userId'); // ✅ ID del usuario logueado
    const token = localStorage.getItem('token'); // ✅ token para autorización

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuarios(res.data);
            } catch (err) {
                setMensaje(`❌ Error al cargar usuarios: ${err.response?.data?.message || err.message}`);
            }
        };

        fetchUsuarios();
    }, [token]);

    const handleDelete = async id => {
        try {
            await axios.delete(`http://localhost:5001/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsuarios(prev => prev.filter(u => u._id !== id));
            setMensaje('✅ Usuario eliminado correctamente');
        } catch (err) {
            setMensaje(`❌ Error al eliminar usuario: ${err.response?.data?.message || err.message}`);
        }
    };

    const admins = usuarios.filter(user => user.role === 'admin');

    return (
        <div className='eliminar-usuario'>
            <h3 className='titulo'>Eliminar Usuario</h3>
                <div className='usuarios-list'>
                    <div className='usuarios-admins'>
                        <ul>
                            {admins.map(user => (
                                user._id !== currentUserId && (
                                    <li key={user._id} className='usuarios-individuales'>
                                        {user.username} ({user.role})
                                        <button onClick={() => handleDelete(user._id)} className='deleteUser'>Eliminar</button>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default EliminarUsuario;