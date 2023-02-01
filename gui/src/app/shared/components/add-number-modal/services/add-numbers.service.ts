import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { BaseService } from '../../../services/base-http.service';

@Injectable()
export class AddNumbersService extends BaseService {
  public isUnique(checkingNumber: string): Observable<boolean> {
    return this.get<{ valid: boolean }>('is-number-valid', {carNumber: checkingNumber}).pipe(
      map((validation) => !validation.valid)
    );
  }
}
