require('dotenv').config();
const User = require('../models/User.js');
// const Order = require('../models/Order.js');
const jwt_secret = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transporter = require('../config/nodemailer.js');

const UserController = {
  async create(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: password,
        role: 'user',
        confirmed: false,
      });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' });
      const url = 'http://localhost:3000/users/confirm/' + emailToken;

      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirma tu registro',
        html: `<h3>Bienvenid@ a la DuckWeb, estás apunto de registrarte</h3>
        <a href="${url}">Confirma tu registro</a>`,
      });

      res.status(201).send({ msg: 'Te hemos enviado un correo para confirmar el registro', user });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).send({ msg: 'Usuari@ o contraseña incorrectos' });
      }

      if (!user.confirmed) {
        return res.status(400).send({ msg: 'Debes confirmar tu correo' });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: 'Usuari@ o contraseña incorrectos' });
      }

      const token = jwt.sign({ id: user._id }, jwt_secret);

      user.tokens.push(token);
      await user.save();

      res.send({ msg: `Bienvenid@ ${user.name}`, user, token });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .select('name last_name email adress')
        .populate({
          path: 'orders',
          select: '_id',
          populate: {
            path: 'products',
            select: 'name price',
          },
        });

      if (!user) {
        return res.status(404).send({ msg: 'Usuario no encontrado' });
      }

      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);

      await User.updateOne({ email: payload.email }, { confirmed: true });

      res.status(201).send('Usuari@ confirmad@ con éxito');
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async logout(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const tokenToRemove = req.headers.authorization?.split(' ')[1];

      // Remover el token específico del array
      user.tokens = user.tokens.filter((token) => token !== tokenToRemove);
      await user.save();

      res.send({ msg: 'Desconectad@ con éxito' });
    } catch (error) {
      res.status(500).send({ msg: 'Hubo un problema al tratar de desconectarte' });
    }
  },
};

module.exports = UserController;
