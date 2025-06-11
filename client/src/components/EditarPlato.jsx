import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarPlato = () => {
    const [platos, setPlatos] = useState([]);
    const [form, setForm] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        ingredientes: '',
        alergenos: '',
        categoria: '',
        precio: '',
        img: null
    });
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5001/api/platos')
            .then(res => setPlatos(res.data))
            .catch(err => setMensaje(`❌ Error al cargar platos: ${err.message}`));
    }, []);

    const handleSelect = e => {
        const plato = platos.find(p => p._id === e.target.value);
        if (plato) {
            setForm({
                id: plato._id,
                titulo: plato.titulo || '',
                descripcion: plato.descripcion || '',
                ingredientes: plato.ingredientes || '',
                alergenos: plato.alergenos || '',
                categoria: plato.categoria || '',
                precio: plato.precio || ''
            });
        }
    };

    const handleChange = e => {
        if (e.target.name === 'img') {
            setForm({ ...form, img: e.target.files[0] }); // guarda el File
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', form.titulo);
        formData.append('descripcion', form.descripcion);
        formData.append('ingredientes', form.ingredientes);
        formData.append('alergenos', form.alergenos);
        formData.append('categoria', form.categoria);
        formData.append('precio', form.precio);

        if (form.img instanceof File) {
            formData.append('img', form.img);
        }

        try {
            const res = await axios.put(
                `http://localhost:5001/api/platos/${form.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setMensaje(`✅ Plato actualizado: ${res.data.titulo}`);
        } catch (err) {
            setMensaje(`❌ Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className='editarUsuario'>
            <h3 className='titulo'>Editar Plato</h3>

            <select onChange={handleSelect} defaultValue="" className='selectCrearUsuario'>
                <option value="" disabled>Selecciona un plato</option>
                {platos.map(plato => (
                    <option key={plato._id} value={plato._id}>{plato.titulo}</option>
                ))}
            </select>

            {form.id && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
                    <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
                    <input type="text" name="ingredientes" placeholder="Ingredientes" value={form.ingredientes} onChange={handleChange} required />
                    <input type="text" name="alergenos" placeholder="Alérgenos" value={form.alergenos} onChange={handleChange} required />
                    <input type="number" step="1" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                    <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleChange}
                    />
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
                    <button type="submit" className='guardarCambios'>Guardar Cambios</button>
                </form>
            )}

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default EditarPlato;