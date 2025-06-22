// seeders/categorySeeder.js
const mongoose = require("mongoose");
const { dbConnection } = require("../config/config");
const Category = require("../models/category");

const categories = [
  { name: "Actor / Actriz" },
  { name: "Cantante" },
  { name: "Deportista" },
  { name: "Celebridad" },
  { name: "Cuakito" },
  { name: "Megacuak" },
  { name: "Escritora / Escritor" },
];

const seedCategories = async () => {
  try {
    await dbConnection();
    await Category.deleteMany();
    const inserted = await Category.insertMany(categories);
    console.log("🌱 Categorías Cuak insertadas:");
    inserted.forEach((cat) => {
      console.log(`🟢 ${cat.name} → ID: ${cat._id}`);
    });
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar categorías:", error);
    process.exit(1);
  }
};

seedCategories();
