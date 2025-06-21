const Category = require('../models/category');
const Product = require('../models/product');

const CategoryController = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send({ msg: 'Categoría creada con éxito', category });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).send({ msg: 'Categoría no encontrada' });
      res.send('Categoría actualizada con éxito');
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Category.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).send({ msg: 'Categoría no encontrada' });
      res.send('Categoría eliminada con éxito');
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getAllWithProducts(req, res) {
    try {
      const categories = await Category.find().lean();
      const categoriesWithProducts = await Promise.all(
        categories.map(async (category) => {
          const products = await Product.find({ category: category._id }).select('id name price');
          return { ...category, products };
        })
      );
      res.send(categoriesWithProducts);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).send({ msg: 'Categoría no encontrada' });
      res.send(category);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getOneByName(req, res) {
    try {
      const regex = new RegExp(req.params.name, 'i');
      const category = await Category.findOne({ name: regex });
      res.send(category);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = CategoryController;
