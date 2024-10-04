import { ApiCodeResponse } from '@api/enum/api-code.response';

export interface ApiResponse {
  result: boolean;
  code: ApiCodeResponse;
  data: any;
  paramError: boolean;
}
