const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, 'Introducir el nombre de plato'],
            unique: true,
            trim: true,
        },
        descripcion: {
            type: String,
            required: [true, 'Introducir la descripción del plato'],
        },
        ingredientes: {
            type: String,
            required: [true, 'Introducir los ingredientes del plato'],
        },
        alergenos: {
            type: String,
            required: [true, 'Introducir los alergenos del plato'],
        },
        categoria: {
            type: String,
            required: [true, 'Introducir la categoria del plato'],
        },
        precio: {
            type: String,
            required: [true, 'Introducir el precio del plato'],
        },
        img: {
            type: String
        },
        isActive: { // Para eliminación lógica
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Platos', userSchema);