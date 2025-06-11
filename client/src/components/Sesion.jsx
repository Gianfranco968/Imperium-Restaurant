import React, { useState } from 'react';

const AuthForm = () => {
  const [registerData, setRegisterData] = useState({ username: '', password: '', role: 'user' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      setMessage(res.ok ? '✅ Usuario registrado correctamente' : '❌ Error: ' + (data.error || 'No se pudo registrar'));
    } catch (err) {
      setMessage('❌ Error de red: ' + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      setLoginMessage(res.ok ? `✅ Sesión iniciada correctamente. Bienvenido ${data.username}` : '❌ Error: ' + (data.error || 'Credenciales inválidas'));

    } catch (err) {
      setLoginMessage('❌ Error de red: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuario"
          required
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        /><br /><br />
        <select
          value={registerData.role}
          onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
        >
          <option value="user">Usuario</option>
          <option value="admin">Admin</option>
        </select><br /><br />
        <button type="submit">Registrarse</button>
      </form>
      <div>{message}</div>

      <hr />

      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          required
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        /><br /><br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div>{loginMessage}</div>
    </div>
  );
};

export default AuthForm;