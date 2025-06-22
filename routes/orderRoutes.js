const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { authentication } = require('../middlewares/authentication');

router.post('/', authentication, OrderController.create);
router.get('/', authentication, OrderController.getAllOrdersWithProducts);

module.exports = router;
