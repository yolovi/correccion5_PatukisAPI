const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);
router.get('/with-products', CategoryController.getAllWithProducts);
router.get('/:id', CategoryController.getById);
router.get('/name/:name', CategoryController.getOneByName);

module.exports = router;
