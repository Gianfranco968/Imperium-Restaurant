import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CrearUsuario from './CrearUsuario';
import ListarUsuarios from './ListarUsuarios';
import EditarUsuario from './EditarUsuario';
import EliminarUsuario from './EliminarUsuario';
import CrearPlato from './CrearPlato';
import ListarPlatos from './ListarPlatos';
import EliminarPlato from './EliminarPlato';
import EditarPlato from './EditarPlato';

const AdminPanel = ({ onLogout }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [activeSection, setActiveSection] = useState(null); // Sección principal: 'users' o 'dishes'
  const [activeUserAction, setActiveUserAction] = useState(null); // Acción dentro de users

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/admin');
  };

  const handleBack = () => {
    if (activeUserAction) {
      setActiveUserAction(null); // Vuelve a las opciones de usuario
    } else {
      setActiveSection(null); // Vuelve al menú principal
    }
  };

  return (
    <>
      <div className="menu" style={{ position: 'relative', width: '100%' }}>
        {/* Fondo con opacidad */}
        <div
          style={{
            content: '""',
            backgroundImage: `url(${process.env.PUBLIC_URL + '/img/restaurant_demo.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        ></div>

        <h1 className='titulo-principal'>Panel de Administrador</h1>

        {!activeSection && (
          <>
            <h4 className="bienvenida">Bienvenido, {username}</h4>
            <div className="admin-grid">
              <div className="admin-card" onClick={() => setActiveSection('users')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Usuarios</h3>
                <p>Permite administrar usuarios</p>
              </div>
              <div className="admin-card" onClick={() => setActiveSection('dishes')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Platos</h3>
                <p>Permite administrar platos del menú</p>
              </div>
            </div>
          </>
        )}

        {activeSection === 'users' && !activeUserAction && (
          <>
            <div className="admin-grid">
              <div className="admin-card" onClick={() => setActiveUserAction('crear')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Crear Usuario</h3>
                <p>Dar de alta un nuevo usuario</p>
              </div>
              <div className="admin-card" onClick={() => setActiveUserAction('listar')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Listar Usuario</h3>
                <p>Obtener usuarios</p>
              </div>
              <div className="admin-card" onClick={() => setActiveUserAction('editar')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Modificar Usuario</h3>
                <p>Editar datos de un usuario existente</p>
              </div>
              <div className="admin-card" onClick={() => setActiveUserAction('eliminar')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Eliminar Usuario</h3>
                <p>Dar de baja un usuario</p>
              </div>
            </div>
            <div className="button-container">
              <button className="back-btn" onClick={handleBack}>Volver</button>
            </div>
          </>
        )}

        {activeSection === 'dishes' && !activeUserAction && (
          <>
            <div className="admin-grid">
              <div className="admin-card" onClick={() => setActiveUserAction('crearPlato')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Crear Plato</h3>
                <p>Dar de alta un nuevo plato</p>
              </div>
              <div className="admin-card" onClick={() => setActiveUserAction('listarPlato')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Listar Platos</h3>
                <p>Obtener platos</p>
              </div>
              <div className="admin-card" onClick={() => setActiveUserAction('editarPlato')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Modificar Plato</h3>
                <p>Editar datos de un plato existente</p>
              </div>
              <div className="admin-card" onClick={() => setActiveUserAction('eliminarPlato')} style={{ cursor: 'pointer' }}>
                <h3 className='bloques-titulo'>Eliminar Plato</h3>
                <p>Dar de baja un plato</p>
              </div>
            </div>
            <div className="button-container">
              <button className="back-btn" onClick={handleBack}>Volver</button>
            </div>
          </>
        )}

        {activeUserAction === 'crear' && (
          <>
            <div className="admin-subpanel">
              <CrearUsuario />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>)}

        {activeUserAction === 'listar' && (
          <>
            <div className="admin-subpanel">
              <ListarUsuarios />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>
        )}

        {activeUserAction === 'editar' && (
          <>
            <div className="admin-subpanel">
              <EditarUsuario />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>
        )}

        {activeUserAction === 'eliminar' && (
          <>
            <div className="admin-subpanel">
              <EliminarUsuario />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>
        )}

        {activeUserAction === 'crearPlato' && (
          <>
            <div className="admin-subpanel">
              <CrearPlato />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>)}

        {activeUserAction === 'listarPlato' && (
          <>
            <div className="admin-subpanel">
              <ListarPlatos />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>)}

        {activeUserAction === 'eliminarPlato' && (
          <>
            <div className="admin-subpanel">
              <EliminarPlato />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>)}

        {activeUserAction === 'editarPlato' && (
          <>
            <div className="admin-subpanel">
              <EditarPlato />
            </div>
            <button className="back-btn" onClick={handleBack}>Volver</button>
          </>)}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </>
  );
};

export default AdminPanel;