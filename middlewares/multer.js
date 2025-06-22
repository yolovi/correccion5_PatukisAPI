const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Función para crear carpeta si no existe
const ensureFolderExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// Mapeo de tipo a carpeta
const folderMap = {
  users: 'uploads/users',
  products: 'uploads/products',
  reviews: 'uploads/reviews',
};

const getStorage = (type) => {
  const folder = folderMap[type];

  ensureFolderExists(folder); // Garantiza que la carpeta existe

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      cb(null, `${base}-${Date.now()}${ext}`);
    },
  });
};

// Exportar middleware de subida por tipo
module.exports = {
  uploadFor: (type) => {
    if (!folderMap[type]) throw new Error(`Tipo de carpeta no válido: ${type}`);

    return multer({
      storage: getStorage(type),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máx
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowed.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de archivo no permitido. Solo imágenes.'));
        }
      },
    });
  },
};
