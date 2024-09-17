import { HttpException } from '@nestjs/common';
import { ApiCodeResponse } from '@common/api';

export class ApiException extends HttpException {
  constructor(code: ApiCodeResponse, status: number, data?: any) {
    super(
      {
        code: code,
        data: data,
        result: false,
      },
      status,
    );
  }
}

