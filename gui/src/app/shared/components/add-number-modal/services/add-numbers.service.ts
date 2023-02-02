import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { BaseService } from '../../../services/base-http.service';

@Injectable()
export class AddNumbersService extends BaseService {
  public isUnique(checkingNumber: string): Observable<boolean> {
    return this.get<{ valid: boolean }>('is-number-valid', {carNumber: checkingNumber}).pipe(
      map((validation) => !validation.valid),
      catchError(() => {
        console.log('Something wrong with api');

        return of(true)
      })
    );
  }
}
