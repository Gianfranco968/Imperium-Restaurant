import React, { useEffect, useState } from 'react';

const ListarPlatos = () => {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5001/api/platos')
            .then((res) => res.json())
            .then((data) => {
                console.log('Platos recibidos:', data);
                setPlatos(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener platos:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando platos...</p>;

    return (
        <div className='listar-usuarios'>
            <h3 className='titulo'>Listado de Platos</h3>
            {platos.length === 0 ? (
                <p>No hay platos registrados.</p>
            ) : (
                <table className="tabla-platos">
                    <thead>
                        <tr className='tabla-platos-titulo'>
                            <th>Titulo</th>
                            <th>Descripción</th>
                            <th>Ingredientes</th>
                            <th>Alergenos</th> 
                            <th>Categoría</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platos.map((platos) => (
                            <tr key={platos._id} className='tabla-platos-fila'>
                                <td>{platos.titulo}</td>
                                <td>{platos.descripcion}</td>
                                <td>{platos.ingredientes}</td>
                                <td>{platos.alergenos}</td>
                                <td>{platos.categoria}</td>
                                <td>${platos.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListarPlatos;