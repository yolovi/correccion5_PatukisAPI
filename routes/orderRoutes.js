const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/', OrderController.create);
router.get('/', OrderController.getAllOrdersWithProducts);

module.exports = router;
