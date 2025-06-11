const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Crear un nuevo usuario
// @route   POST /api/users
router.post('/', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Por favor completa todos los campos.' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const user = await User.create({
      username,
      password,
      role: role || 'admin',
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      message: 'Usuario creado correctamente.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al crear usuario.' });
  }
});

// @desc    Listar usuarios (con filtros)
// @route   GET /api/users
router.get('/', async (req, res) => {
  try {
    const query = {};

    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }

    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al listar usuarios.' });
  }
});

// @desc    Modificar un usuario
// @route   PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const { username, password, role, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    if (username) user.username = username;
    if (password) user.password = password;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      message: 'Usuario actualizado correctamente.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al modificar usuario.' });
  }
});

// @desc    Eliminar un usuario
// @route   DELETE /api/users/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const currentUserId = req.user._id.toString(); // ✅ asegurarse de que sea string

    // Evitar que un usuario se elimine a sí mismo
    if (userIdToDelete === currentUserId) {
      return res.status(400).json({ message: 'No podés eliminar tu propio usuario mientras estás logueado.' });
    }

    // Buscar al usuario que se desea eliminar
    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Si el usuario a eliminar es un superadmin, solo un superadmin puede hacerlo
    if (userToDelete.role === 'superadmin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'No tenés permiso para eliminar a un superadmin.' });
    }

    // Eliminar al usuario
    const result = await User.deleteOne({ _id: userIdToDelete });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No se pudo eliminar el usuario.' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente.', id: userIdToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al eliminar usuario.' });
  }
});

module.exports = router;