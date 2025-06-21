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

  async toggleLike(req, res) {
    try {
      const reviewId = req.params.id;
      const userId = req.user._id;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: 'Review no encontrada' });
      }

      const index = review.likes.indexOf(userId);

      if (index === -1) {
        review.likes.push(userId);
      } else {
        review.likes.splice(index, 1);
      }

      await review.save();

      return res.status(200).json({ message: 'Like toggled', likesCount: review.likes.length });
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

module.exports = ReviewController;
