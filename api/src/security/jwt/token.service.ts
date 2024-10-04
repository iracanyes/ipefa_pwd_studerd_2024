/**
 * This service will generate, persist and validate tokens
 * We inject 2 repository for entities (Token, Credential) and
 * the JwtService at build
 *
 * Une bonne stratégie de sécurité est d’avoir un token avec une durée de vie très courte , par exemple 10 / 15minutes.
 * Le problème c’est que vous ne pouvez pas déconnecter votre client toutes les 15min.
 * C’est là qu’intervient le refreshToken,
 * qui lui en général à une durée de vie beaucoup plus longue.
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential, Token } from '@security/model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenGenerationException } from '@security/security.exception';
import { ConfigKey, configManager } from '@common/config';
import { Builder } from 'builder-pattern';
import { RefreshPayload } from '@security/model/payloads/refresh.payload';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    private jwtService: JwtService,
  ) {}

  async getTokens(credential: Credential): Promise<Token> {
    try {
      /*
       *
       */
      await this.credentialRepository.delete(credential);

      const payload = { sub: credential.credential_id };

      // For security purpose, the hashed key for token and refresh token must be différent
      const token = await this.jwtService.signAsync(payload, {
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN),
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
        expiresIn: configManager.getValue(
          ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN,
        ),
      });

      await this.tokenRepository.upsert(
        Builder<Token>()
          .token(token)
          .refresh_token(refreshToken)
          .credential(credential)
          .build(),
        ['credential'],
      );

      return this.tokenRepository.findOneBy({ token: token });
    } catch (error) {
      this.logger.error(error.message);
      throw new TokenGenerationException();
    }
  }

  /**
   *
   * @param credential
   */
  async deleteFor(credential: Credential): Promise<void> {
    await this.tokenRepository.delete({ credential });
  }

  /**
   * Cette méthode a pour but de permettre à un client
   * de demander un nouveau token sans devoir renseigner
   * à nouveau son identifiant et mot de passe
   * @param payload
   */
  async refresh(payload: RefreshPayload): Promise<Token> {
    try {
      const id = this.jwtService.verify(payload.refresh, {
        secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
      }).sub;

      const credential = await this.credentialRepository.findOneBy({
        credential_id: id,
      });

      return await this.getTokens(credential);
    } catch (error) {
      this.logger.error(error.message);
      throw new TokenGenerationException();
    }
  }
}
