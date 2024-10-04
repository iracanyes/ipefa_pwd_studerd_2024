/**
 * Cette méthode va simplement extraire les erreurs des différents controls
 */
import { FormError, GetAllFormErrorsFn } from '@shared/ui/form/type';
import { FormGroup, ValidationErrors } from '@angular/forms';

export const getFormValidationErrors: GetAllFormErrorsFn = (form: FormGroup): FormError[] => {
  const result: FormError[] = [];

  Object.keys(form.controls).forEach( key => {
    //
    const controlErrors: ValidationErrors | null = form.get(key)!.errors;

    if(controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          control: key,
          error: keyError,
          value: controlErrors[keyError]
        });
      })
    }
  });

  return result;
}
