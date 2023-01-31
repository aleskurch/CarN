import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AddNumbersService } from './services/add-numbers.service';

@Directive({
  selector: '[appUniquenessValidator]',
})
export class UniquenessValidator {
  static checkUniqueness(
    addNumbersService: AddNumbersService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      addNumbersService.isUnique(control.value).pipe(
        map((result: boolean) =>
          result
            ? {
                numberAlreadyExists: true,
              }
            : null
        )
      );
  }
}
