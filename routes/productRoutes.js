const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Rutas CRUD básicas
router.post('/', /* upload.single('image'), */ ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

// Rutas de consulta
router.get('/', ProductController.getAllWithCategories);
router.get('/id/:id', ProductController.getById);
router.get('/name/:name', ProductController.getAllByName);
router.get('/price/:price', ProductController.getAllByPrice);
router.get('/price-range/:minprice/:maxprice', ProductController.getAllByPriceRange);
router.get('/desc-price', ProductController.getDescPrice);

module.exports = router;
