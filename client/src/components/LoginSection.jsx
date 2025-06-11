import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && (data.role === 'admin' || data.role === 'superadmin')) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);

        setMessage({ text: '✅ Acceso concedido', type: 'success' });

        // ✅ Redirige al panel
        setTimeout(() => navigate('/admin/panel'), 300);
      } else {
        setMessage({ text: data.error || '⚠️ No sos administrador.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: '❌ Error de red: ' + err.message, type: 'error' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
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

      <div className="menu">
        <h1 className="titulo-principal">Iniciar Sesión</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input className="datos" name="username" placeholder="Usuario" onChange={handleChange} required />
          <input className="datos" name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
          <button className="ingresar" type="submit">Ingresar</button>
        </form>
        <div id="message" className={message.type}>{message.text}</div>
      </div>
    </div>
  );
};

export default LoginSection;