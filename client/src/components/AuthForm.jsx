import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);

        setLoginMessage(`Bienvenido ${data.username}`);

        setTimeout(() => {
          if (data.role === 'admin' || data.role === 'superadmin') {
            navigate('/admin/panel');
          } else {
            navigate('/home');
          }
        }, 100);
      } else {
        setLoginMessage('Error: ' + (data.error || 'Credenciales inválidas'));
      }
    } catch (err) {
      setLoginMessage('Error de red: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>{loginMessage}</p>
    </div>
  );
};

export default AuthForm;