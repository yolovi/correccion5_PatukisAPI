const express = require('express');
const router = express.Router();
const { uploadFor } = require('../middlewares/multer');
const ProductController = require('../controllers/productController');

// Rutas CRUD básicas
router.post('/', uploadFor('products').single('image'), ProductController.create);
router.put('/:id', uploadFor('products').single('image'), ProductController.update);
router.delete('/:id', ProductController.delete);

// Rutas de consulta
router.get('/', ProductController.getAllWithCategories);
router.get('/id/:id', ProductController.getById); // No estoy seguro de esto. COMPROBAR
router.get('/name/:name', ProductController.getAllByName);
router.get('/price/:price', ProductController.getAllByPrice);
router.get('/price-range/:minprice/:maxprice', ProductController.getAllByPriceRange);
router.get('/desc-price', ProductController.getDescPrice);

module.exports = router;
