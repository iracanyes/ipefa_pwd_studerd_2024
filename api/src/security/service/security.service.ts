/**
 * This service will persist and validate Credential objects
 * We will inject the repository object for Credential
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential, Token } from '@security/model';
import { Repository } from 'typeorm';
import { TokenService } from '@security/jwt/token.service';
import { isNil } from 'lodash';
import {
  CredentialDeleteException,
  SignupException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from '@security/security.exception';
import { SignInPayload } from '@security/model/payloads/sign-in.payload';
import { comparePassword, encryptPassword } from '@common/utils';
import { SignupPayload } from '@security/model/payloads/signup.payload';
import { Builder } from 'builder-pattern';
import { RefreshPayload } from '@security/model/payloads/refresh.payload';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Allow to retrieve Credential object by ID
   * @param id
   */
  async detail(id: string): Promise<Credential> {
    const result = await this.credentialRepository.findOneBy({
      credential_id: id,
    });

    if (!isNil(result)) return result;

    throw new UserNotFoundException();
  }

  /**
   * Cette méthode permet la connexion!
   * Il existe plusieurs façons de se connecter :
   *  o Classique : identifiant et mot de passe
   *  o Google : utiliser le hash google (social login)
   *  o Facebook: utiliser le hash Facebook (social login)
   *
   *  Évidemment, l’api offre la possibilité d’enregistrer un hash, la génération du hash est à la charge du client
   *  Au final on retournera un élément de type token!
   * @param payload
   * @param isAdmin
   */
  async signIn(
    payload: SignInPayload,
    isAdmin: boolean,
  ): Promise<Token | null> {
    let result = null;

    if (payload.socialLogin) {
      if (!isNil(payload.facebookHash) && payload.facebookHash.length > 0) {
        result = await this.credentialRepository.findOneBy({
          facebookHash: payload.facebookHash,
          isAdmin: isAdmin,
        });
      } else {
        result = await this.credentialRepository.findOneBy({
          googleHash: payload.googleHash,
          isAdmin: isAdmin,
        });
      }
    } else {
      result = await this.credentialRepository.findOneBy({
        username: payload.username,
        isAdmin: isAdmin,
      });
    }

    if (
      !isNil(result) &&
      (payload.socialLogin ||
        (await comparePassword(payload.password, result.password)))
    ) {
      return this.tokenService.getTokens(result);
    }

    throw new UserNotFoundException();
  }

  /**
   * Allow to register a user
   * @param payload
   */
  async signup(payload: SignupPayload): Promise<Credential | null> {
    const result: Credential | null = await this.credentialRepository.findOneBy(
      {
        username: payload.username,
      },
    );

    if (!isNil(result)) {
      throw new UserAlreadyExistsException();
    }

    try {
      const encryptedPassword =
        (payload.facebookHash && payload.facebookHash.length === 0)
          || (payload.googleHash && payload.googleHash.length === 0)
          ? await encryptPassword(payload.password)
          : '';

      return this.credentialRepository.save(
        Builder<Credential>()
          .username(payload.username)
          .password(encryptedPassword)
          .facebookHash(payload.facebookHash)
          .googleHash(payload.googleHash)
          .email(payload.mail)
          .build(),
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new SignupException();
    }
  }

  /**
   * Refresh token
   * @param payload
   */
  async refresh(payload: RefreshPayload): Promise<Token | null> {
    return this.tokenService.refresh(payload);
  }

  /**
   * Verify that Credential object exists and delete it and all tokens associated
   * @param id
   */
  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.tokenService.deleteFor(detail);
      await this.credentialRepository.remove(detail);
    } catch (error) {
      this.logger.error(error.message);
      throw new CredentialDeleteException();
    }
  }
}
