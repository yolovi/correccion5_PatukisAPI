const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, introduce un nombre de usuario'],
    },
    last_name: {
      type: String,
      required: [true, 'Por favor, introduce un apellido de usuario'],
    },
    email: {
      type: String,
      match: [/^.*@.*\..*/, 'Este correo no es válido'],
      required: [true, 'Por favor, rellena tu email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Por favor, introduce una contraseña'],
    },
    role: {
      type: String,
      default: 'user',
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    adress: {
      type: String,
      required: [true, 'Por favor, introduce una dirección'],
    },
    tokens: [],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
