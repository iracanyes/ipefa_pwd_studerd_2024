import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiCodeResponse, ApiException } from '@common/api';

export class MemberCreateException extends HttpException {
  constructor() {
    super(
      {
        code: ApiCodeResponse.MEMBER_CREATE_EXCEPTION,
        data: null,
        result: false,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class MemberNotFoundException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_NOT_FOUND_EXCEPTION,
      HttpStatus.NOT_FOUND,
      null,
    );
  }
}

export class MemberListException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_LIST_EXCEPTION,
      HttpStatus.INTERNAL_SERVER_ERROR,
      null,
    );
  }
}

export class MemberUpdateException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_UPDATE_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      null,
    );
  }
}

export class MemberDeleteException extends HttpException {
  constructor() {
    super(
      {
        code: ApiCodeResponse.MEMBER_DELETE_EXCEPTION,
        data: null,
        result: false,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
