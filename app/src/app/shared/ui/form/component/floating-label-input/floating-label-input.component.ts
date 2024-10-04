import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInForm } from '@security/model/dto';
import { FormError } from '@shared/ui/form/type';
import { getFormValidationErrors } from '@shared/ui/form/utils/get-all-form-errors.helper';

@Component({
  selector: 'app-floating-label-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './floating-label-input.component.html',
  styleUrl: './floating-label-input.component.scss'
})
export class FloatingLabelInputComponent {
  @Input({ required: true })
  label!: string;
  @Input({ required: true })
  control!: FormControl<any>;

  inputFocus: boolean;

  constructor() {
    this.inputFocus = false;
  }


}
