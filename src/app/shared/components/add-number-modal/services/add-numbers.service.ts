import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { BaseService } from "../../../services/base-http.service";

@Injectable()
export class AddNumbersService extends BaseService {
  public isUnique(checkingNumber: string): Observable<boolean> {
    return of(checkingNumber === 'AAA000').pipe(delay(2000))
  }
}
