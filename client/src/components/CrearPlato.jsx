import React, { useState } from 'react';
import axios from 'axios';

const CrearPlato = () => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    ingredientes: '',
    alergenos: '',
    categoria: '',
    precio: '',
    img: null, // ahora null explícitamente
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setForm({ ...form, img: files[0] }); // Guarda el archivo como objeto File
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (key === 'img' && form[key]) {
        formData.append('img', form.img); // nombre exacto que espera multer
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await axios.post('http://localhost:5001/api/platos', formData);
      setMensaje(`✅ Plato creado: ${res.data.plato?.titulo || 'OK'}`);

      setForm({
        titulo: '',
        descripcion: '',
        ingredientes: '',
        alergenos: '',
        categoria: '',
        precio: '',
        img: null,
      });
    } catch (err) {
      setMensaje(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h3 className='titulo'>Crear Plato</h3>
      <form onSubmit={handleSubmit} className='formCrearUsuario'>
        <input type="text" name="titulo" placeholder="Titulo" value={form.titulo} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripcion" value={form.descripcion} onChange={handleChange} required />
        <input type="text" name="ingredientes" placeholder="Ingredientes" value={form.ingredientes} onChange={handleChange} required />
        <input type="text" name="alergenos" placeholder="Alergenos" value={form.alergenos} onChange={handleChange} required />
        <input type='text' name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input type="file" name="img" accept="image/*" onChange={handleChange} required />
        <select name="categoria" value={form.categoria} onChange={handleChange} className='selectCrearUsuario' required>
          <option value="">Seleccionar categoría</option>
          <option value="entradas">Entradas</option>
          <option value="ensaladas">Ensaladas</option>
          <option value="platos-principales">Platos Principales</option>
          <option value="pastas">Pastas</option>
          <option value="postres">Postres</option>
          <option value="bebidas-alcoholicas">Bebidas Alcohólicas</option>
          <option value="bebidas-sin-alcohol">Bebidas Sin Alcohol</option>
        </select>
        <button type="submit" className='crearPlato'>Crear</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearPlato;