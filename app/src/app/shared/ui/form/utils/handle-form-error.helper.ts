/**
 * Cette méthode va simplement permettre de catcher les changement
 * et ensuite d’appeler la prochaine méthode.
 * L’avantage de la mettre ici est assez simple,
 * nous allons faire cela un peu près partout dans notre application !
 * Write once Use EveryWhere
 * IMPORTANT: !!!!!! YOU NEED TO CALL THIS IN CONSTRUCTOR COMPONENT !!!!!!!!! BECAUSE OF TAKEUNTILDESTROYED
 * https://indepth.dev/posts/1518/takeuntildestroy-in-angular-v16
 */
import { FormError, HandleValueChangeFn } from '@shared/ui/form/type';
import { FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { WritableSignal } from '@angular/core';
import { getFormValidationErrors } from '@shared/ui/form/utils/get-all-form-errors.helper';

export const handleFormError: HandleValueChangeFn = (form: FormGroup, signal: WritableSignal<FormError[]>): void => {
  //
  form.valueChanges
    .pipe(
      // Here we kill this observer when component is destroyed
      takeUntilDestroyed(),
      // Transform the value to FormError array
      map(() => getFormValidationErrors(form)),
      // Send signal with new errors
      tap((errors: FormError[]) => signal.set(errors))
    )
    .subscribe();
}
