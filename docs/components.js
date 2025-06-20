module.exports = {
  components: {
    schemas: {
      // Respuestas básicas
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
        },
      },

      Success: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: { type: 'object' },
        },
      },
    },
  },
};
