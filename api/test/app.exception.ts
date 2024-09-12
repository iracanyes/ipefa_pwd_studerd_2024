import { ApiException } from '../src/exceptions/api.exception';
import { ApiCodeResponse } from '@common/api';

export class TestException extends ApiException {
  constructor() {
    super(ApiCodeResponse.TEST, 200);
  }
}
