module.exports = {
  // Crear una nueva orden
  '/orders': {
    post: {
      tags: ['Orders'],
      summary: 'Crear una nueva orden',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id_user: {
                  type: 'string',
                  description: 'ID del usuario que realiza la orden',
                  example: '60d21b4667d0d8992e610c85',
                },
                id_products: {
                  type: 'array',
                  description: 'Array de IDs de productos incluidos en la orden',
                  items: {
                    type: 'string',
                  },
                  example: ['60d21b4967d0d8992e610c86', '60d21b4b67d0d8992e610c87'],
                },
              },
              required: ['id_user', 'id_products'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Orden creada con éxito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  order: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      user: { type: 'string' },
                      products: {
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
        400: { description: 'No se encontraron productos válidos' },
        404: { description: 'Usuario no encontrado' },
        500: { description: 'Error del servidor' },
      },
    },

    // Obtener todas las órdenes con productos y usuario
    get: {
      tags: ['Orders'],
      summary: 'Obtener todas las órdenes con detalles de usuario y productos',
      responses: {
        200: {
          description: 'Lista de órdenes con productos y usuario',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        last_name: { type: 'string' },
                        adress: { type: 'string' },
                      },
                    },
                    products: {
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
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        500: { description: 'Error del servidor' },
      },
    },
  },
};
