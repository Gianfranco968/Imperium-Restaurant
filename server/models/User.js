
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para hashear contraseñas

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Introducir nombre de usuario'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Introducir contraseña'],
    },
    role: { 
      type: String,
      enum: ['admin'], 
      default: 'user',
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

// Método para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar la contraseña ingresada con la hasheada
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);