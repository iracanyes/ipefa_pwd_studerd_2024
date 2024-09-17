import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class SwaggerConfig {
  constructor() {}

  config(app: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle(process.env.APP_NAME)
      .setDescription('NestJS Swagger Document')
      .setVersion(process.env.APP_VERSION)
      .addBearerAuth(
        {
          description: 'Please enter token',
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    // Setup the route for swagger docs
    SwaggerModule.setup('docs', app, document, {
      jsonDocumentUrl: 'swagger.json',
    });
  }
}

const swaggerConfiguration = new SwaggerConfig();

export { swaggerConfiguration };
