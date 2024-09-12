/**
 * @ApiTags permet de définir un nom pour notre controlleur
 * @ApiOperations
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Route de base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Operation Hello World', description: 'Cette opération est le service de base'})
  @Get()
  getHello(): Response {
    return this.appService.getHello();
  }
}
