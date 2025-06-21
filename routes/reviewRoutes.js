const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

router.post('/', ReviewController.create);
router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getById);
router.get('/content/:content', ReviewController.getOneByContent);
router.put('/:id', ReviewController.update);
router.delete('/:id', ReviewController.delete);

module.exports = router;
