const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js + MySQL Auth API',
      version: '1.0.0',
      description: 'API with email sign-up, verification, authentication and forgot password'
    },
    servers: [
      {
        url: process.env.API_URL || 'https://angular-auth-backend-1-crp5.onrender.com',
        description: 'API Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);