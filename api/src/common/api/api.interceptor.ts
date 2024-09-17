/**
 * it intercepts API response and return the appropriated format of response
 */
import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiCodeResponse } from '@common/api/api-code.response';
import { ConfigKey, configManager } from '@common/config';
import { isNil } from 'lodash';

export class ApiInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ApiInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const path = ctx.getRequest().route.path;

    // We transform the response returned to ApiResponse
    // Recall: result must be true otherwise exceptions are thrown
    return next.handle()
      .pipe(
        map((response: any) => {
          return {
            code: this.map(path),
            data: response,
            result: true,
          };
        })
      );
  }

  map(path: string): ApiCodeResponse {
    this.logger.log(`path: ${path}`);

    // Here, we construct the key for ApiCodeResponse
    // parsing the path to convert it to our standard key
    const part = path
      .replace(configManager.getValue(ConfigKey.APP_BASE_URL), '')
      .split('/')
      .filter((e) => e.length > 0)
      .slice(0, 2)
      .map((s) => s.toUpperCase());

    const code =
      ApiCodeResponse[
        `${part.join('_')}_SUCCESS` as keyof typeof ApiCodeResponse
      ];
    // If the key doesn't exist, we return the standard code
    return isNil(code) ? ApiCodeResponse.COMMON_SUCCESS : code;
  }
}
