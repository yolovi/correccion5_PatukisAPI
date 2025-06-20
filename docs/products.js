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
      summary: 'Crear un nuevo producto',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del producto',
                  example: 'Patito Amarillo',
                },
                price: {
                  type: 'number',
                  description: 'Precio del producto',
                  example: 15.99,
                },
                id_category: {
                  type: 'string',
                  description: 'ID de la categoría',
                  example: '507f1f77bcf86cd799439011',
                },
              },
              required: ['name', 'price'],
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
                      price: { type: 'number' },
                      image: { type: 'string' },
                      categories: { type: 'array' },
                      orders: { type: 'array' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
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
  },

  // Obtener producto por ID
  '/products/id/{id}': {
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
    // Actualizar producto
    put: {
      tags: ['Products'],
      summary: 'Actualizar producto',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID del producto',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                image: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Producto actualizado con éxito',
        },
        500: {
          description: 'Error del servidor',
        },
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

  // Actualizar producto
  '/products/{id}': {
    put: {
      tags: ['Products'],
      summary: 'Actualizar producto',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID del producto',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                image: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Producto actualizado con éxito',
        },
        500: {
          description: 'Error del servidor',
        },
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
