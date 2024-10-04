import { inject, Injectable } from '@angular/core';
import { ApiService } from '@shared/api';
import { ApiUri } from '@api/enum/api-uri.enum';
import { ApiResponse } from '@api/types/api.response';
import { SignInPayload } from '@security/model/payload';
import { TokenService } from '@security';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly api: ApiService = inject(ApiService);


  signIn(payload: Partial<SignInPayload>): void {

  }
}
