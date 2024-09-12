import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from '@root/app.module';
import { HttpExceptionFilter } from '@common/index';
import { swaggerConfiguration } from '@common/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Documentation
  swaggerConfiguration.config(app);

  // Add Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
