import React, { useEffect, useState } from 'react';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('Usuarios recibidos:', data);
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className='listar-usuarios'>
      <h3 className='titulo'>Listado de Usuarios</h3>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="tabla-usuarios">
          <thead>
            <tr className='tabla-usuarios-titulo'>
              <th>User</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id} className='tabla-usuarios-fila'>
                <td>{usuario.username}</td>
                <td>{usuario.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarUsuarios;