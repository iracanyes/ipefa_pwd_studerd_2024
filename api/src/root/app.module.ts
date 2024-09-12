import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from '../controller/account.controller';
import { AuthController } from '../controller/auth.controller';
import { AccountService } from '../services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configManager } from '@common/config/config.manager';

@Module({
  imports: [TypeOrmModule.forRoot(configManager.getTypeOrmConfig())],
  controllers: [AppController, AccountController, AuthController],
  providers: [AppService, AccountService],
})
export class AppModule {}
