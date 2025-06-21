module.exports = {
  // Obtener todos los productos con categorías
  '/products': {
    get: {
      tags: ['Products'],
      summary: 'Obtener todos los productos con categorías',
      responses: {
        200: {
          description: 'Lista de productos con categorías',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    categories: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: { type: 'string' },
                          name: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },

    // Crear producto
    post: {
      tags: ['Products'],
      summary: 'Crear un nuevo producto con imagen',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del producto',
                  example: 'Camiseta de algodón',
                },
                description: {
                  type: 'string',
                  description: 'Descripción del producto',
                  example: 'Camiseta 100% algodón orgánico',
                },
                price: {
                  type: 'number',
                  description: 'Precio del producto',
                  example: 19.99,
                },
                id_category: {
                  type: 'string',
                  description: 'ID de la categoría (opcional)',
                  example: '665e7fa6ddee7a9c782a9434',
                },
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'Imagen del producto (archivo)',
                },
              },
              required: ['name', 'description', 'price'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Producto creado con éxito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  product: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                      price: { type: 'number' },
                      image: { type: 'string' },
                      categories: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Datos incompletos o inválidos' },
        500: { description: 'Error del servidor' },
      },
    },
  },

  // Obtener productos por ID
  '/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Obtener producto por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID del producto',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Producto encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
    put: {
      tags: ['Products'],
      summary: 'Actualizar un producto (con o sin nueva imagen)',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID del producto a actualizar',
          schema: {
            type: 'string',
            example: '665f4c04e97eb7d0f73b1f65',
          },
        },
      ],
      requestBody: {
        required: false,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del producto',
                  example: 'Camiseta actualizada',
                },
                description: {
                  type: 'string',
                  description: 'Descripción del producto',
                  example: 'Descripción nueva',
                },
                price: {
                  type: 'number',
                  description: 'Precio actualizado',
                  example: 25.99,
                },
                id_category: {
                  type: 'string',
                  description: 'ID de la categoría',
                  example: '665e7fa6ddee7a9c782a9434',
                },
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'Nueva imagen del producto (opcional)',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Producto actualizado con éxito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  product: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                      price: { type: 'number' },
                      image: { type: 'string' },
                      categories: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: 'Producto no encontrado' },
        500: { description: 'Error del servidor' },
      },
    },

    // Eliminar producto
    delete: {
      tags: ['Products'],
      summary: 'Eliminar producto',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID del producto',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Producto eliminado con éxito',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  // Buscar productos por nombre
  '/products/name/{name}': {
    get: {
      tags: ['Products'],
      summary: 'Buscar productos por nombre',
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'Nombre del producto a buscar',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Productos encontrados',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    image: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  // Buscar productos por precio exacto
  '/products/price/{price}': {
    get: {
      tags: ['Products'],
      summary: 'Buscar productos por precio exacto',
      parameters: [
        {
          name: 'price',
          in: 'path',
          required: true,
          description: 'Precio exacto del producto',
          schema: { type: 'number' },
        },
      ],
      responses: {
        200: {
          description: 'Productos encontrados',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  // Buscar productos por rango de precio
  '/products/price-range/{minprice}/{maxprice}': {
    get: {
      tags: ['Products'],
      summary: 'Buscar productos por rango de precio',
      parameters: [
        {
          name: 'minprice',
          in: 'path',
          required: true,
          description: 'Precio mínimo',
          schema: { type: 'number' },
        },
        {
          name: 'maxprice',
          in: 'path',
          required: true,
          description: 'Precio máximo',
          schema: { type: 'number' },
        },
      ],
      responses: {
        200: {
          description: 'Productos encontrados en el rango de precio',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  // Obtener productos ordenados por precio descendente
  '/products/desc-price': {
    get: {
      tags: ['Products'],
      summary: 'Obtener productos ordenados por precio (mayor a menor)',
      responses: {
        200: {
          description: 'Productos ordenados por precio descendente',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    image: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },
};
