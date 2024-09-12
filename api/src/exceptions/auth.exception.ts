import { ApiException } from './api.exception';
import { ApiCodeResponse } from '@common/api';

export class AuthException extends ApiException {
  constructor(data?: any) {
    super(ApiCodeResponse.UNAUTHORIZED, 401, data);
  }
}
