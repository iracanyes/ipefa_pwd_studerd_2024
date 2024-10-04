/**
 * @ApiTags permet de définir un nom pour notre controlleur
 * @ApiOperations
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/config';

@ApiTags('Route de base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @ApiOperation({
    summary: 'Operation Hello World',
    description: 'Cette opération est le service de base',
  })
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
