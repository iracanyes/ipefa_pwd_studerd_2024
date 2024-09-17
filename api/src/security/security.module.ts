import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential, Token } from './model';
import { TokenService } from './jwt/token.service';
import { SecurityService } from './service/security.service';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigKey, configManager } from '@common/config';

@Module({
  providers: [TokenService, SecurityService],
  controllers: [SecurityController],
  imports: [
    TypeOrmModule.forFeature([Credential, Token]),
    JwtModule.register({
      global: true,
      secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
      signOptions: {
        expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN),
      },
    }),
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
