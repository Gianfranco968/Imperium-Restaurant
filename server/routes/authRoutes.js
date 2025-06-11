const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

const SECRET_KEY = 'miclavefija123';

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: '❌ Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: '❌ Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Error del servidor' });
  }
});

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ error: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Error al registrar' });
  }
});

// DELETE USUARIO (con protección para no eliminar el que está logueado)
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const currentUserId = req.user._id.toString();

    if (userIdToDelete.toString() === currentUserId.toString()) {
      return res.status(400).json({ message: '❌ No podés eliminar tu propia cuenta mientras estás logueado.' });
    }

    const result = await User.deleteOne({ _id: userIdToDelete });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: '❌ Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente.', id: userIdToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Error del servidor al eliminar usuario.' });
  }
});

module.exports = router;