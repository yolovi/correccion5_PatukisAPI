const express = require('express');
const router = express.Router();
const { uploadFor } = require('../middlewares/multer');
const ReviewController = require('../controllers/reviewController');
const { authentication, isAuthorReview } = require('../middlewares/authentication');

/**CORRECCION:
 * desestructurar ReviewController
 * middlewares entre [] y cuando son muchos los dividimos en lineas
 */
router.post('/', authentication, uploadFor('reviews').single('image'), ReviewController.create);
router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getById);
router.get('/content/:content', ReviewController.getOneByContent);
router.put('/:id', authentication, isAuthorReview, uploadFor('reviews').single('image'), ReviewController.update);
router.delete('/:id', authentication, isAuthorReview, ReviewController.delete);
router.put('/:id/toggleLike', authentication, ReviewController.toggleLike);

module.exports = router;
