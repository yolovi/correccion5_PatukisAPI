const express = require('express');
const router = express.Router();
const { uploadFor } = require('../middlewares/multer');
const ProductController = require('../controllers/productController');
const { authentication, isAdmin } = require('../middlewares/authentication');

// Rutas CRUD básicas
router.post('/', authentication, isAdmin, uploadFor('products').single('image'), ProductController.create);
router.put('/:id', authentication, isAdmin, uploadFor('products').single('image'), ProductController.update);
router.delete('/:id', authentication, isAdmin, ProductController.delete);

// Rutas de consulta
router.get('/', ProductController.getAllWithCategories);
router.get('/:id', ProductController.getById);
router.get('/name/:name', ProductController.getAllByName);
router.get('/price/:price', ProductController.getAllByPrice);
router.get('/price-range/:minprice/:maxprice', ProductController.getAllByPriceRange);
router.get('/desc-price', ProductController.getDescPrice);

module.exports = router;
