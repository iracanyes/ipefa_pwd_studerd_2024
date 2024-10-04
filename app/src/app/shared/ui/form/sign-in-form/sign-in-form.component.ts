import { Component, inject, PLATFORM_ID } from '@angular/core';
import { InputComponent } from '@shared/ui/form';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SignInForm } from '@security/model/dto';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { ApiService } from '@shared/api';
import { ApiUri } from '@api/enum/api-uri.enum';
import { FormError } from '@shared/ui/form/type';
import { getFormValidationErrors } from '@shared/ui/form/utils/get-all-form-errors.helper';
import { tap } from 'rxjs';
import { ApiResponse } from '@api/types/api.response';
import { AccountService } from '@security/service/account.service';
import { TokenService } from '@security';
import { isNil } from 'lodash';
import { environment } from '@environments';
import { TranslateModule } from '@ngx-translate/core';
import { LabelWithParamComponent } from '@shared/ui/text/component/label-with-param/label-with-param.component';
import { LabelWithParamDirective } from '@shared/ui/text/directive/label-with-param.directive';
import { LabelWithParamPipe } from '@shared/ui/text/pipe/label-with-param.pipe';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    TranslateModule,
    NgIf,
    LabelWithParamComponent,
    LabelWithParamDirective,
    LabelWithParamPipe,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  loginFormGroup: FormGroup<SignInForm>;
  private readonly api: ApiService = inject(ApiService);
  //private readonly tokenService: TokenService = inject(TokenService);

  constructor() {
    this.loginFormGroup = new FormGroup<SignInForm>(<SignInForm>{
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.initFormGroup();
  }

  private initFormGroup(): void {
    this.loginFormGroup.valueChanges.subscribe(
      () => console.log('loginFormGroup values', this.loginFormGroup.value)
    );
  }

  error(): FormError[] {
    let result: FormError[] = [];

    result = getFormValidationErrors(this.loginFormGroup);
    return result;
  }

  get(key: string): FormControl<any> {
    return this.loginFormGroup.get(key)! as FormControl<any>;
  }

  signIn(): void {
    console.log("Sign-In: cliqué", ApiUri.SIGN_IN,  this.loginFormGroup.value);

    this.api.post(ApiUri.SIGN_IN, this.loginFormGroup.value)
      .subscribe((result: ApiResponse) => {
        console.log(result);

        if(isPlatformBrowser(PLATFORM_ID) && result.data.token.length > 0){
          //this.tokenService.setToken(result.data);
          console.log('On client side!');
          if(!isNil(localStorage)){
            localStorage.setItem(environment.TOKEN_KEY, JSON.stringify(result.data));
            console.log('Token saved on client', result.data);
          }
        }


      });
  }
}
