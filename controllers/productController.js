const Product = require("../models/product.js");
const Category = require("../models/category.js");
const Review = require("../models/review.js");

const ProductController = {
  async create(req, res, next) {
    try {
      const imagePath = req.file ? req.file.path : null;

      // Crear el producto
      const product = new Product({
        ...req.body,
        image: imagePath,
      });

      // Si viene una categoría, agregarla al array
      if (req.body.id_category) {
        product.categories.push(req.body.id_category);
      }

      await product.save();
      res.status(201).send({ msg: "Producto creado con éxito", product });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res) {
    try {
      const updateData = { ...req.body };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!product) {
        return res.status(404).send({ msg: "Producto no encontrado" });
      }

      res.send({ msg: "Producto actualizado con éxito", product });
    } catch (error) {
      res.status(500).send({ msg: "Error al actualizar producto", error });
    }
  },

  async delete(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.send("Producto eliminado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getAllWithCategories(req, res) {
    try {
      const products = await Product.find({}, "name price description image").populate(
        "categories",
        "name"
      );
      // .populate('reviews', 'content'); // Nota: necesitarás agregar 'reviews' virtual o cambiar la estructura
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(
        req.params.id,
        "name price description image"
      ).populate("categories", "name");
      // .populate('reviews', 'content'); // Nota: necesitarás agregar 'reviews' virtual o cambiar la estructura
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getAllByName(req, res) {
    try {
      const productsName = new RegExp(req.params.name, "i");
      const products = await Product.find({ name: productsName });
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getAllByPrice(req, res) {
    try {
      const products = await Product.find(
        { price: req.params.price }, // Equivale a Op.eq
        "name price image"
      );
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getAllByPriceRange(req, res) {
    try {
      const minprice = parseFloat(req.params.minprice);
      const maxprice = parseFloat(req.params.maxprice);
      const products = await Product.find(
        { price: { $gte: minprice, $lte: maxprice } }, // $gte y $lte equivalen a BETWEEN
        "name price image"
      );
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getDescPrice(req, res) {
    try {
      const products = await Product.find({}).sort({ price: -1 }); // -1 para DESC, 1 para ASC
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = ProductController;
