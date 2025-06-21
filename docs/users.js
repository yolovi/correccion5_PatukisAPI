// swagger/users.js

module.exports = {
  '/users': {
    post: {
      tags: ['Users'],
      summary: 'Registrar un nuevo usuario',
      description: 'Crea una nueva cuenta de usuario y envía un email de confirmación',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'last_name', 'email', 'password', 'adress'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del usuario',
                  example: 'Juan',
                },
                last_name: {
                  type: 'string',
                  description: 'Apellido del usuario',
                  example: 'Pérez',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email del usuario',
                  example: 'juan@example.com',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                  example: 'miPassword123',
                },
                adress: {
                  type: 'string',
                  description: 'Dirección del usuario',
                  example: 'Calle Mayor 123, Madrid',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Usuario creado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Te hemos enviado un correo para confirmar el registro',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '64a7b8c9d1e2f3g4h5i6j7k8',
                      },
                      name: {
                        type: 'string',
                        example: 'Juan',
                      },
                      email: {
                        type: 'string',
                        example: 'juan@example.com',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Error en los datos enviados',
        },
      },
    },
  },

  '/users/login': {
    post: {
      tags: ['Users'],
      summary: 'Iniciar sesión',
      description: 'Autentica al usuario y devuelve un token de acceso',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email del usuario',
                  example: 'juan@example.com',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                  example: 'miPassword123',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login exitoso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Bienvenid@ Juan',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '64a7b8c9d1e2f3g4h5i6j7k8',
                      },
                      name: {
                        type: 'string',
                        example: 'Juan',
                      },
                      email: {
                        type: 'string',
                        example: 'juan@example.com',
                      },
                    },
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Credenciales incorrectas o email no confirmado',
        },
      },
    },
  },

  '/users/confirm/{emailToken}': {
    get: {
      tags: ['Users'],
      summary: 'Confirmar email de usuario',
      description: 'Confirma la cuenta del usuario usando el token enviado por email',
      parameters: [
        {
          name: 'emailToken',
          in: 'path',
          required: true,
          description: 'Token de confirmación enviado por email',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        201: {
          description: 'Email confirmado exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'string',
                example: 'Usuari@ confirmad@ con éxito',
              },
            },
          },
        },
        500: {
          description: 'Token inválido o expirado',
        },
      },
    },
  },

  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Obtener usuario por ID',
      description: 'Obtiene la información de un usuario específico',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID del usuario',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Usuario encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '64a7b8c9d1e2f3g4h5i6j7k8',
                  },
                  name: {
                    type: 'string',
                    example: 'Juan',
                  },
                  last_name: {
                    type: 'string',
                    example: 'Pérez',
                  },
                  email: {
                    type: 'string',
                    example: 'juan@example.com',
                  },
                  adress: {
                    type: 'string',
                    example: 'Calle Mayor 123, Madrid',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Usuario no encontrado',
        },
        401: {
          description: 'No autorizado - Token requerido',
        },
      },
    },
  },

  '/users/logout': {
    post: {
      tags: ['Users'],
      summary: 'Cerrar sesión',
      description: 'Cierra la sesión del usuario eliminando el token',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Sesión cerrada exitosamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Desconectad@ con éxito',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'No autorizado - Token requerido',
        },
        500: {
          description: 'Error al cerrar sesión',
        },
      },
    },
  },
  '/users/wishlist/{productId}': {
    put: {
      tags: ['Users'],
      summary: 'Añadir o quitar un producto de la wishlist',
      description:
        'Permite al usuario autenticado añadir o eliminar un producto de su lista de deseos (wishlist). Si el producto ya está en la lista, se eliminará; si no está, se añadirá.',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'productId',
          in: 'path',
          required: true,
          description: 'ID del producto a añadir o eliminar de la wishlist',
          schema: {
            type: 'string',
            example: '64a7b8c9d1e2f3g4h5i6j7k8',
          },
        },
      ],
      responses: {
        200: {
          description: 'Wishlist actualizada correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Producto añadido a la wishlist',
                  },
                  wishlist: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '64a7b8c9d1e2f3g4h5i6j7k8',
                        },
                        name: {
                          type: 'string',
                          example: 'Patito de goma pirata',
                        },
                        price: {
                          type: 'number',
                          example: 9.99,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Usuario o producto no encontrado',
        },
        401: {
          description: 'No autorizado - Token requerido',
        },
        500: {
          description: 'Error al actualizar la wishlist',
        },
      },
    },
  },

  '/users/me': {
    get: {
      tags: ['Users'],
      summary: 'Obtener perfil del usuario autenticado',
      description: 'Devuelve los datos del usuario autenticado junto con su wishlist',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Perfil del usuario',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: { type: 'string', example: '64a7b8c9d1e2f3g4h5i6j7k8' },
                  name: { type: 'string', example: 'Juan' },
                  last_name: { type: 'string', example: 'Pérez' },
                  email: { type: 'string', example: 'juan@example.com' },
                  adress: { type: 'string', example: 'Calle Mayor 123, Madrid' },
                  role: { type: 'string', example: 'user' },
                  confirmed: { type: 'boolean', example: true },
                  wishlist: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string', example: '665b2d182c8a7a7b9b331234' },
                        name: { type: 'string', example: 'Camiseta Duck' },
                        price: { type: 'number', example: 19.99 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'No autorizado - token faltante o inválido',
        },
        500: {
          description: 'Error del servidor',
        },
      },
    },
  },
};
