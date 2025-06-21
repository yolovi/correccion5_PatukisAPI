const express = require('express');
const router = express.Router();
const { uploadFor } = require('../middlewares/multer');
const ReviewController = require('../controllers/reviewController');

router.post('/', uploadFor('reviews').single('image'), ReviewController.create);
router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getById);
router.get('/content/:content', ReviewController.getOneByContent);
router.put('/:id', uploadFor('reviews').single('image'), ReviewController.update);
router.delete('/:id', ReviewController.delete);
router.put('/reviews/:id/toggleLike', ReviewController.toggleLike);

module.exports = router;
