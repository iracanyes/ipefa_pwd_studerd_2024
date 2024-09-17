import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from '../controller/person.controller';
import { AccountService } from '../services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configManager } from '@common/config/config.manager';
import { SecurityModule } from '@security/security.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@security/jwt/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
    SecurityModule,
  ],
  controllers: [AppController, PersonController],
  providers: [
    AppService,
    AccountService,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AppModule {}
