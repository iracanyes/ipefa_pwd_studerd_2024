import { Payload } from '@shared/core/model/payload.type';

export interface SignInPayload extends Payload {
  username: string;
  password: string;
  googleHash: string;
  facebookHash: string;
  socialLogin: boolean;
}
