import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from '@root/app.module';
import {
  ConfigKey,
  configManager,
  HttpExceptionFilter,
  swaggerConfiguration,
  ValidationException,
} from '@common/index';
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { ApiInterceptor } from '@common/api/api.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set the URL prefix of the application
  app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL));

  // Swagger Documentation
  swaggerConfiguration.config(app);

  // Add interceptor
  // Intercept HttpResponse
  app.useGlobalInterceptors(new ApiInterceptor());

  // Add Filters
  // Filter exceptions returned by the API
  app.useGlobalFilters(new HttpExceptionFilter());

  // Active Validator
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new ValidationException(validationErrors),
    }),
  );

  if (process.env.API_PORT === undefined) {
    throw new Error('API_PORT environmnent variable is required');
  }
  await app.listen(parseInt(configManager.getValue(ConfigKey.APP_PORT), 10));
}
bootstrap().then(() => {
  const logger = new Logger('Main Logger');
  logger.log('Server started!');
});
