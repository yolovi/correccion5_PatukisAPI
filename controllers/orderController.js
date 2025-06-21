const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

const OrderController = {
  async create(req, res) {
    try {
      const { id_user, id_products } = req.body;

      const user = await User.findById(id_user);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const validProducts = await Product.find({
        _id: { $in: id_products },
      });

      if (validProducts.length === 0) {
        return res.status(400).json({ error: 'No se encontraron productos válidos' });
      }

      const productIds = validProducts.map((product) => product._id);

      const order = new Order({
        user: id_user,
        products: productIds,
      });

      await order.save();

      res.status(201).json({
        msg: 'Orden creada con éxito',
        order,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear la orden',
        details: error.message,
      });
    }
  },

  async getAllOrdersWithProducts(req, res) {
    try {
      const orders = await Order.find()
        .select('_id user products createdAt updatedAt')
        .populate({
          path: 'user',
          select: 'name last_name adress',
        })
        .populate({
          path: 'products',
          select: 'name price',
        });

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'No se han podido obtener los pedidos', details: error.message });
    }
  },
};

module.exports = OrderController;
