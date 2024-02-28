import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
    apis: ['../routes/*.ts'],
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fleet Tracking API',
            version: '1.0.0',
            description: 'API for managing and tracking fleet operations',
        },
    },
};
export function setupSwagger(app: express.Application): void {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
