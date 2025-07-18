const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, introduce un nombre de producto"],
    },
    price: {
      type: Number,
      required: [true, "Por favor, introduce un precio de producto"],
    },
    description: {
      type: String,
      required: [true, "Por favor, introduce un precio de producto"],
    },
    image: {
      type: String,
      default: null,
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
