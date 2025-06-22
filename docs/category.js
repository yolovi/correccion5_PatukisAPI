module.exports = {
  // Crear categoría
  "/categories": {
    post: {
      tags: ["Categories"],
      summary: "Crear una nueva categoría",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Nombre de la categoría",
                  example: "Electrónica",
                },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Categoría creada con éxito",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: { type: "string" },
                  category: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      name: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: "Error del servidor" },
      },
    },
  },
  // Obtener todas las categorías con productos
  "/categories/with-products": {
    get: {
      tags: ["Categories"],
      summary: "Obtener todas las categorías con sus productos",
      responses: {
        200: {
          description: "Lista de categorías con productos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    name: { type: "string" },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: { type: "string" },
                          name: { type: "string" },
                          price: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: "Error del servidor" },
      },
    },
  },

  // Obtener, actualizar y eliminar categoría por id
  "/categories/{id}": {
    get: {
      tags: ["Categories"],
      summary: "Obtener categoría por ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la categoría",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Categoría encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
        404: { description: "Categoría no encontrada" },
        500: { description: "Error del servidor" },
      },
    },

    put: {
      tags: ["Categories"],
      summary: "Actualizar categoría",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la categoría a actualizar",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Nombre nuevo de la categoría",
                  example: "Electrónica actualizada",
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Categoría actualizada con éxito" },
        404: { description: "Categoría no encontrada" },
        500: { description: "Error del servidor" },
      },
    },

    delete: {
      tags: ["Categories"],
      summary: "Eliminar categoría",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la categoría a eliminar",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Categoría eliminada con éxito" },
        404: { description: "Categoría no encontrada" },
        500: { description: "Error del servidor" },
      },
    },
  },

  // Buscar categoría por nombre (parcial)
  "/categories/name/{name}": {
    get: {
      tags: ["Categories"],
      summary: "Buscar categoría por nombre",
      parameters: [
        {
          name: "name",
          in: "path",
          required: true,
          description: "Nombre o parte del nombre de la categoría",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Categoría encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
        500: { description: "Error del servidor" },
      },
    },
  },
};
