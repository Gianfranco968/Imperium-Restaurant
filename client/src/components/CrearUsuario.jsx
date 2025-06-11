import React, { useState } from 'react';
import axios from 'axios';

const CrearUsuario = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'admin' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/users', form);
      setMensaje(`✅ Usuario creado: ${res.data.username}`);
      setForm({ username: '', password: '', role: 'admin' });
    } catch (err) {
      setMensaje(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h3 className='titulo'>Crear Usuario</h3>
      <form onSubmit={handleSubmit} className='formCrearUsuario'>
        <input type="text" name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange} className='selectCrearUsuario'>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className='crearUsuario'>Crear</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearUsuario;