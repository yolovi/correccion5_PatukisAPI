const Review = require("../models/review");
const Product = require("../models/product");
const { dbConnection } = require("../config/config");

const userIds = [
  "685a4f80af3e4916732861c7", // Juan Pèrez (juan@example.com)
  "685abc21833bf3cbe7e6f49a", // Usuario Patistico (usuario@patistico.com)
  "6856e6dee9a439d0239745af", // Pepito Pèrez (juanperez@example.com)
];

const contents = [
  "¡Este pato cambió mi vida!",
  "Muy divertido, ideal para decorar.",
  "No esperaba que graznara, me asusté pero me encanta.",
  "Lo compré como broma, ¡y ahora quiero más!",
  "Excelente calidad, y gracioso como él solo.",
  "Me llegó antes de lo previsto y cuackea perfecto.",
  "Lo llevé al trabajo y ahora todos quieren uno.",
  "Cada vez que lo veo, me río. Pato 10/10.",
  "Perfecto para regalar. Nadie se lo espera.",
  "Pensé que era absurdo… hasta que lo amé.",
  "El mejor compañero de ducha que he tenido.",
  "¡Me hace compañía en el escritorio!",
  "Revolucionó mi estanque.",
  "Le puse nombre y ahora es parte de la familia.",
  "Cuackea mejor que yo. Increíble.",
  "Vino con actitud. ¡Y estilo!",
  "No sabía que necesitaba esto hasta que lo vi.",
  "Mis gatos lo odian, yo lo amo.",
  "Ideal para romper el hielo con visitas.",
  "Más carisma que algunos humanos.",
  "Le pongo música y baila… en mi mente.",
  "Altamente cuacktivado.",
  "Si tuviera más espacio, tendría 12.",
  "Lo vi, lo compré, lo adopté.",
  "Le hablo como si fuera real. ¿Está mal?",
  "No sabía que el plástico podía tener tanta personalidad.",
  "¡Mis amigos me envidian por este pato!",
  "Pato aprobado por mi abuela. Eso es mucho.",
];

const seedReviews = async () => {
  try {
    await dbConnection();

    const products = await Product.find().lean();

    const reviewDocs = [];

    products.forEach((product) => {
      const shuffledUsers = userIds.sort(() => 0.5 - Math.random());
      const shuffledContents = contents.sort(() => 0.5 - Math.random());

      for (let i = 0; i < 2; i++) {
        reviewDocs.push({
          content: shuffledContents[i],
          product: product._id,
          user: shuffledUsers[i],
          likes: [],
        });
      }
    });

    await Review.insertMany(reviewDocs);
    console.log("Se insertaron las reviews correctamente.");
    process.exit();
  } catch (err) {
    console.error("Error al insertar reviews:", err);
    process.exit(1);
  }
};

seedReviews();
