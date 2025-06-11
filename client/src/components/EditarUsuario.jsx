import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ id: '', username: '', password: '', role: '', isActive: true });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/users').then(res => setUsuarios(res.data));
  }, []);

  const handleSelect = e => {
    const user = usuarios.find(u => u._id === e.target.value);
    setForm({ id: user._id, username: user.username, password: '', role: user.role, isActive: user.isActive });
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { id, ...rest } = form;
      const res = await axios.put(`http://localhost:5001/api/users/${id}`, rest);
      setMensaje(`✅ Usuario actualizado: ${res.data.username}`);
    } catch (err) {
      setMensaje(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className='editarUsuario'>
      <h3 className='titulo'>Editar Usuario</h3>
      <select onChange={handleSelect} defaultValue="" className='selectCrearUsuario'>
        <option value="" disabled>Selecciona un usuario</option>
        {usuarios.map(user => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>

      {form.id && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Nueva contraseña" />
          <button type="submit" className='guardarCambios'>Guardar Cambios</button>
        </form>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EditarUsuario;