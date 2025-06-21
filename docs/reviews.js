module.exports = {
  '/reviews': {
    post: {
      tags: ['Reviews'],
      summary: 'Crear una nueva review',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  example: 'Este producto es excelente',
                },
                product: {
                  type: 'string',
                  example: '60d21b4967d0d8992e610c86',
                },
                user: {
                  type: 'string',
                  example: '60d21b4667d0d8992e610c85',
                },
              },
              required: ['content', 'product', 'user'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Review creada con éxito',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },

    get: {
      tags: ['Reviews'],
      summary: 'Obtener todas las reviews con el nombre del usuario',
      responses: {
        200: {
          description: 'Lista de reviews',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    content: { type: 'string' },
                    product: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
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
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  '/reviews/{id}': {
    get: {
      tags: ['Reviews'],
      summary: 'Obtener una review por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Review encontrada',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },

    put: {
      tags: ['Reviews'],
      summary: 'Actualizar una review por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
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
                content: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Review actualizada con éxito',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },

    delete: {
      tags: ['Reviews'],
      summary: 'Eliminar una review por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Review eliminada con éxito',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  '/reviews/content/{content}': {
    get: {
      tags: ['Reviews'],
      summary: 'Buscar una review por contenido',
      parameters: [
        {
          name: 'content',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Review encontrada',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },

  '/reviews/{id}/toggleLike': {
    put: {
      tags: ['Reviews'],
      summary: 'Añade o elimina un like de la review para el usuario autenticado',
      description: 'Si el usuario ya ha dado like a la review, se elimina. Si no, se añade.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la review',
          required: true,
          schema: {
            type: 'string',
            format: 'ObjectId',
          },
        },
      ],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Like toggled correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Like toggled',
                  },
                  likesCount: {
                    type: 'integer',
                    example: 5,
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Review no encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Review no encontrada',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Error interno del servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Error interno del servidor',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
