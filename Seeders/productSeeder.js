const { dbConnection } = require("../config/config");
const Product = require("../models/Product");
const Category = require("../models/Category");

const seedProducts = async () => {
  try {
    await dbConnection();

    // Buscar las categorías por nombre
    const actor = await Category.findOne({ name: "Actor / Actriz" });
    const cantante = await Category.findOne({ name: "Cantante" });
    const deportista = await Category.findOne({ name: "Deportista" });
    const celebridad = await Category.findOne({ name: "Celebridad" });
    const cuakito = await Category.findOne({ name: "Cuakito" });
    const megacuak = await Category.findOne({ name: "Megacuak" });
    const escritor = await Category.findOne({ name: "Escritora / Escritor" });

    const products = [
      {
        name: "Arnold Cuakzenegger",
        price: 20,
        description:
          "¡El patito más musculado del estanque! Con bíceps inflables y gafas de sol, este pato dice “I'll be Cuack” mientras protege tu estantería del aburrimiento.",
        image: "https://i.imgur.com/DCIIyDV.png",
        categories: [actor._id, celebridad._id, megacuak.id],
      },
      {
        name: "Dua Licuak",
        price: 23,
        description:
          "Altavoz bluetooth en forma de pato pop-star. Con luces LED y sonidos que graznan al ritmo de la música. Ideal para cuackncerts en la ducha.",
        image: "https://i.imgur.com/YJvs2TX.png",
        categories: [cantante._id, megacuak.id, cuakito.id],
      },
      {
        name: "Elon Cuask",
        price: 3,
        description:
          "El patopatín más futurista: va solo, tiene luces y ¡cuackea cuando frena! Alimentado por IA (Inteligencia Avestruz). Vuela bajo… pero con estilo.",
        image: "https://i.imgur.com/ecjpk4k.png",
        categories: [celebridad._id, cuakito.id],
      },
      {
        name: "Shakira Cuakira",
        price: 19,
        description:
          "Este altavoz patuno no miente: sus caderas se mueven solo con reguetón. Ideal para animar el nido. ¡Shake that cuack!",
        image: "https://i.imgur.com/TMVbcYd.png",
        categories: [cantante._id, celebridad._id, megacuak.id],
      },
      {
        name: "Cuaky Chan",
        price: 25,
        description:
          "Saltos, patadas y graznidos acrobáticos. Este pato experto en kung-fu hace piruetas con un solo dedo y sobrevive a cualquier estantería.",
        image: "https://i.imgur.com/BI6e4VW.png",
        categories: [actor._id, cuakito._id, megacuak.id],
      },
      {
        name: "Duck Norris",
        price: 150,
        description:
          "Invencible, indestructible y... graznador. Este patito rompe lo que sea con la mirada. Si Duck Norris te mira, ya es demasiado tarde.",
        image: "https://i.imgur.com/c8FIFkG.png",
        categories: [actor._id, celebridad.id, megacuak.id, cuakito.id],
      },
      {
        name: "Lady CuaCuak",
        price: 28,
        description:
          "Gorro excéntrico con estilo extravagante. Ideal para fiestas, desfiles o conciertos en el lago. Porque Born this Cuack.",
        image: "https://i.imgur.com/rcM4ebf.png",
        categories: [cantante._id, megacuak._id, celebridad._id],
      },
      {
        name: "Cuaky Jordan",
        price: 18,
        description:
          "Zapatillas miniatura con cámara de aire... ¡para patos! Cada salto deja una huella en forma de charquito. Fly over the pond.",
        image: "https://i.imgur.com/sYpzYTJ.png",
        categories: [deportista._id],
      },
      {
        name: "Cuakminem",
        price: 15,
        description:
          "Micrófono patuno que escupe rimas con flow. Viene con capucha y actitud. Ideal para batallas de freestyle junto al lago.",
        image: "https://i.imgur.com/Oz3vURi.png",
        categories: [cantante._id, cuakito._id],
      },
      {
        name: "Antonio Cuakderas",
        price: 12,
        description:
          "Perfume con esencia a estanque misterioso. Un aroma irresistible con notas de nenúfar y pasión patuna. Un cuack, mil emociones.",
        image: "https://i.imgur.com/oQrSX0v.png",
        categories: [actor._id, cuakito.id],
      },
      {
        name: "Cuackenbauer",
        price: 8,
        description:
          "Balón legendario para entrenar en la charca. Precisión alemana y cuack estratégico. El mediocampista que todo estanque necesita.",
        image: "https://i.imgur.com/mlwWDlG.png",
        categories: [deportista._id, celebridad._id],
      },
      {
        name: "Isabel Cuallende",
        price: 24,
        description:
          "Cuaderno mágico donde cada página tiene aroma a pluma mojada. Para escribir cuentos épicos con un toque de realismo... patuno.",
        image: "https://i.imgur.com/zx9LFVn.png",
        categories: [escritor._id, megacuak.id],
      },
      {
        name: "Cuacky Iglesias",
        price: 14,
        description:
          "Micrófono vintage con voz de pato y efecto reverb romántico. Ideal para serenatas en la charca. Solo para patos con alma de balada.",
        image: "https://i.imgur.com/DUwuUCT.png",
        categories: [cantante.id, cuakito.id],
      },
    ];

    await Product.deleteMany();
    const insertedProducts = await Product.insertMany(products);

    // Asociar productos a sus categorías
    for (const product of insertedProducts) {
      for (const categoryId of product.categories) {
        await Category.findByIdAndUpdate(categoryId, {
          $addToSet: { products: product._id },
        });
      }
    }

    console.log("✅ Productos insertados y asociados a categorías correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
    process.exit(1);
  }
};

seedProducts();
