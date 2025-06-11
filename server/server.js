// server/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');

// Middlewares de autenticación
const { protect, admin } = require('./middleware/authMiddleware');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const platosRoutes = require('./routes/platosRoutes');
const userRoutes = require('./routes/userRoutes'); // Asegurate de crear esta ruta para /api/users

// Cargar variables de entorno
dotenv.config({ path: './.env' });

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/platos', platosRoutes);
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Ruta base
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Servir admin.html solo si está autenticado y es admin
app.get('/admin.html', protect, admin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Servir archivos estáticos (css, js, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Arrancar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});