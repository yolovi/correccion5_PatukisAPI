const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { uploadFor } = require('../middlewares/multer');
const { authentication } = require('../middlewares/authentication');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get('/confirm/:emailToken', UserController.confirm);
router.post('/logout', authentication, UserController.logout);
router.get('/me', authentication, UserController.getProfile);
router.get('/:id', authentication, UserController.getById);
router.put('/me', authentication, uploadFor('users').single('image'), UserController.updateMe);
router.put('/wishlist/:productId', authentication, UserController.toggleWishlist);

module.exports = router;
