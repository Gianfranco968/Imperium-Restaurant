
const express = require('express'); // Importa Express
const router = express.Router();    // Crea una instancia del Router de Express
const Dish = require('../models/Platos'); // Importa el modelo Platos
const multer = require('multer'); // Importa Multer para manejar archivos
const path = require('path'); // Importa Path para manejar rutas de archivos
const { protect, admin } = require('../middleware/authMiddleware'); // Importa los middlewares de autenticación/autorización

// Configuración multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // extensión del archivo
    const baseName = path.basename(file.originalname, ext); // nombre sin extensión
    const uniqueName = `${baseName}${ext}`;
    cb(null, uniqueName); // ejemplo: ensalada.jpg
  },
});
const upload = multer({ storage });

// @desc    Obtener todos los platos
//          Permite filtrar por categoría y búsqueda parcial por título.
//          Solo devuelve platos activos (no eliminados lógicamente).
// @route   GET /api/platos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const query = {};

    // 1. Filtrar por categoría (ej. /api/dishes?category=Entradas)
    if (req.query.category) {
      query.category = req.query.category;
    }

    // 2. Filtrar por nombre (búsqueda parcial, insensible a mayúsculas/minúsculas)
    //    (ej. /api/dishes?search=pizza)
    if (req.query.search) {
      query.titulo = { $regex: req.query.search, $options: 'i' };
    }

    // 3. Solo listar platos activos (para la vista pública de la carta)
    //    Si `isActive` no está definido en el query, por defecto buscamos activos.
    //    Esto permite a un admin buscar inactivos con /api/dishes?isActive=false (si lo necesita)
    //    pero la vista pública solo verá los activos.
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    } else {
      query.isActive = true; // Por defecto, solo trae platos activos
    }


    const dishes = await Dish.find(query);
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error al obtener platos con filtros' });
  }
});

// @desc    Obtener un solo plato por ID
// @route   GET /api/platos/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish || !dish.isActive) { // También verifica que el plato esté activo
      return res.status(404).json({ message: 'Plato no encontrado o inactivo' });
    }
    res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    // Para errores de ID inválido de MongoDB (CastError), devuelve 400
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de plato inválido' });
    }
    res.status(500).json({ message: 'Server Error al obtener plato por ID' });
  }
});


// @desc    Crear un nuevo plato
// @route   POST /api/platos
// @access  Private (se requiere autenticación y rol de admin)
router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { titulo, descripcion, ingredientes, alergenos, categoria, precio } = req.body;

    // Validación simple
    if (!titulo || !descripcion || !precio) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Verificar que haya imagen
    const imgFilename = req.file ? req.file.filename : null;

    console.log('📝 Datos recibidos:', req.body);
    console.log('📷 Archivo recibido:', req.file);

    const nuevoPlato = new Dish({
      titulo,
      descripcion,
      ingredientes,
      alergenos,
      categoria,
      precio,
      img: imgFilename, // Guarda el nombre del archivo con extensión
    });

    await nuevoPlato.save();
    res.status(201).json({ plato: nuevoPlato });
  } catch (error) {
    console.error('❌ Error en POST /api/platos:', error);
    res.status(500).json({ message: '❌ Error al crear el plato' });
  }
});

// @desc    Actualizar un plato
// @route   PUT /api/platos/:id
// @access  Private (se requiere autenticación y rol de admin)
// Agregá Multer también en esta ruta
router.put('/:id', upload.single('img'), async (req, res) => {
  try {
    const { titulo, descripcion, ingredientes, alergenos, categoria, precio } = req.body;

    const updatedFields = {
      titulo,
      descripcion,
      ingredientes,
      alergenos,
      categoria,
      precio,
    };

    // Si se sube una nueva imagen, se actualiza también el campo img
    if (req.file) {
      updatedFields.img = req.file.filename;
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ message: 'Plato no encontrado para actualizar' });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    console.error('❌ Error al actualizar plato:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de plato inválido' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error del servidor al actualizar plato' });
  }
});

// @desc    Eliminar un plato (lógicamente)
// @route   DELETE /api/platos/:id
// @access  Private (se requiere autenticación y rol de admin)
router.delete('/:id', protect, admin, async (req, res) => { // Protegida por middleware
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    // Implementación de eliminación lógica y auditoría
    dish.isActive = false; // Marca el plato como inactivo
    dish.deletedAt = new Date(); // Registra la fecha de eliminación
    // dish.deletedBy = req.user._id; // Opcional: Requiere que req.user exista y sea el ID del admin logueado
    await dish.save(); // Guarda los cambios

    res.status(200).json({ message: 'Plato eliminado lógicamente y auditado exitosamente', id: req.params.id });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de plato inválido' });
    }
    res.status(500).json({ message: 'Server Error al eliminar plato' });
  }
});

module.exports = router; // ¡Exporta el router!