import { Component } from '@angular/core';
import { InputComponent } from '@shared/ui/form';
import { SignInFormComponent } from '@shared/ui/form/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    InputComponent,
    SignInFormComponent,

  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {

  title: string = 'Welcome back!';
  subTitle: string = "Identifiez-vous pour accéder à l'administration";




}
