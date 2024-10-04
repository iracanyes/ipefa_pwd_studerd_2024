import { IsEmpty } from '@shared/core/model/isEmpty';

export interface Token extends IsEmpty {
  token: string;
  refreshToken: string;
}
