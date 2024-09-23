import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ApiCodeResponse } from '@common/api';
import { isNil } from 'lodash';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        code: ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
        // Alternative: Only if you didn't define custom validation exception message
        // using library decorators
        // data: errors.map((e) => validationErrorToApiCodeResponse(e)).flat(),
        data: errors.map((e) => Object.values(e.constraints)).flat(),
        result: false,
      },
      499,
    );
  }
}

/**
 * Convert validation error to ApiCodeResponse format
 * @param error
 */
export const validationErrorToApiCodeResponse = (
  error: ValidationError,
): ApiCodeResponse[] => {
  return Object.keys(error.constraints).map((k: string) => {
    // Debug
    //console.log(`${error.property} ${k} ${camelToSnake(k)}`);

    // k is the constraints violated
    const code =
      ApiCodeResponse[
        `${camelToSnake(error.property)}_${camelToSnake(k)}` as keyof typeof ApiCodeResponse
      ];

    return isNil(code) ? ApiCodeResponse.PAYLOAD_PARAM_IS_MISSING : code;
  });
};

export const camelToSnake = (str: string) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .filter((str) => !(str === 'is' || str === 'Not'))
    .join('_')
    .toUpperCase();
};
