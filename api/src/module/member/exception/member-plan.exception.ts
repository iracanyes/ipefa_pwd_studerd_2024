import { HttpStatus } from '@nestjs/common';
import { ApiException, ApiCodeResponse } from '@common/api';

export class MemberPlanCreateException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_PLAN_CREATE_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      null,
    );
  }
}

export class MemberPlanUpdateException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_PLAN_UPDATE_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      null,
    );
  }
}

export class MemberPlanDeleteException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_PLAN_DELETE_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      null,
    );
  }
}

export class MemberPlanNotFoundException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_PLAN_NOT_FOUND_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      null,
    );
  }
}

export class MemberPlanListException extends ApiException {
  constructor() {
    super(
      ApiCodeResponse.MEMBER_PLAN_LIST_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      null,
    );
  }
}
