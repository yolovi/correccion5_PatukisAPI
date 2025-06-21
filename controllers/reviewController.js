const Review = require('../models/review');
const User = require('../models/user');

const ReviewController = {
  async create(req, res) {
    try {
      const review = await Review.create(req.body);
      res.status(201).send({ msg: 'Review creada con éxito', review });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getAll(req, res) {
    try {
      const reviews = await Review.find().populate('user', 'id name');
      res.status(200).send(reviews);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const review = await Review.findById(req.params.id).populate('user', 'id name');
      res.status(200).send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getOneByContent(req, res) {
    try {
      const review = await Review.findOne({
        content: { $regex: req.params.content, $options: 'i' },
      }).populate('user', 'id name');
      res.status(200).send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      await Review.findByIdAndUpdate(req.params.id, req.body);
      res.send({ msg: 'Review actualizada con éxito' });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.send('Su review se ha eliminado con éxito');
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = ReviewController;
