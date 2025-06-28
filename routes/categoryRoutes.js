const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.post('/', authentication, isAdmin, CategoryController.create);
router.put('/:id', authentication, isAdmin, CategoryController.update);
router.delete('/:id', authentication, isAdmin, CategoryController.delete);
router.get('/', CategoryController.getAllWithProducts);
router.get('/:id', CategoryController.getById);
router.get('/name/:name', CategoryController.getOneByName);

module.exports = router;
