import { ApiCodeResponse, ApiException } from '@common/api';

export class NoTokenFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.NO_TOKEN_FOUND, 401);
  }
}

export class UserNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.USER_NOT_FOUND, 200);
  }
}

export class TokenExpiredException extends ApiException {
  constructor() {
    super(ApiCodeResponse.TOKEN_EXPIRED, 401);
  }
}

export class SignupException extends ApiException {
  constructor() {
    super(ApiCodeResponse.SIGNUP_EXCEPTION, 200);
  }
}

export class CredentialDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CREDENTIAL_DELETED, 200);
  }
}

export class UserAlreadyExistsException extends ApiException {
  constructor() {
    super(ApiCodeResponse.USER_ALREADY_EXISTS, 200);
  }
}

export class TokenGenerationException extends ApiException {
  constructor() {
    super(ApiCodeResponse.TOKEN_GEN_EXCEPTION, 500);
  }
}