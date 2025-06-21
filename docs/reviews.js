module.exports = {
  '/reviews': {
    post: {
      tags: ['Reviews'],
      summary: 'Crear una nueva review',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Contenido de la review',
                  example: 'Excelente producto, muy recomendado',
                },
                product: {
                  type: 'string',
                  description: 'ID del producto reseñado',
                  example: '6660b9f8f93ae8e1234abcd1',
                },
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'Imagen opcional adjunta a la review',
                },
              },
              required: ['content', 'product'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Review creada con éxito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: { type: 'string', example: 'Review creada con éxito' },
                  review: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      content: { type: 'string' },
                      product: { type: 'string' },
                      user: { type: 'string' },
                      image: { type: 'string', nullable: true },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Faltan datos obligatorios' },
        500: { description: 'Error del servidor' },
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
      summary: 'Actualizar una review existente',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la review a actualizar',
          required: true,
          schema: {
            type: 'string',
            example: '6660d2f9e541da2cf4e000ab',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Nuevo contenido de la review',
                  example: 'He cambiado de opinión, no me gustó tanto.',
                },
                product: {
                  type: 'string',
                  description: 'ID del producto (opcional si no se actualiza)',
                  example: '6660b9f8f93ae8e1234abcd1',
                },
                image: {
                  type: 'string',
                  format: 'binary',
                  description: 'Nueva imagen para la review (opcional)',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Review actualizada con éxito',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Review actualizada con éxito',
                  },
                  review: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      content: { type: 'string' },
                      product: { type: 'string' },
                      user: { type: 'string' },
                      image: { type: 'string', nullable: true },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Review no encontrada',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },

    delete: {
      tags: ['Reviews'],
      summary: 'Eliminar una review por ID',
      security: [{ bearerAuth: [] }],
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
      security: [{ bearerAuth: [] }],
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
