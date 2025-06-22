const User = require('../models/user');
const Review = require('../models/review');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Token no proporcionado o mal formado' });
    }

    const token = bearerHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error.message);
    res.status(500).json({ msg: 'Ha habido un problema con el token' });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ['mamapato'];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({ msg: 'No tienes permisos' });
  }
  next();
};

const isAuthorReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review no encontrada' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'No tiene permiso para modificar esta review' });
    }

    next();
  } catch (error) {
    console.error('Error en middleware isAuthorReview:', error.message);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

module.exports = { authentication, isAdmin, isAuthorReview };
