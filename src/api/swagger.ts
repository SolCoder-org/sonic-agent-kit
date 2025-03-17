import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sonic Agent Kit API',
      version: '1.0.0',
      description: 'API documentation for the Sonic Agent Kit',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Wallet',
        description: 'Wallet operations'
      },
      {
        name: 'Token',
        description: 'Token operations'
      },
      {
        name: 'NFT',
        description: 'NFT operations'
      },
      {
        name: 'Game',
        description: 'Game operations'
      },
      {
        name: 'Image',
        description: 'Image operations'
      }
    ]
  },
  apis: ['./src/api/routes/*.ts'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi }; 