import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from '../../../shared/services/base-http.service';
import { ICarNumber } from '../interfaces/car-number.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  public getCarNumbers(): Observable<ICarNumber[]> {
    return of([
      {
        number: 'ABC123',
        holder: 'User 1',
        registerDate: new Date(),
      },
      {
        number: 'DEF456',
        holder: 'User 2',
        registerDate: new Date(),
      },
      {
        number: 'GHJ789',
        holder: 'User 3',
        registerDate: new Date(),
      },
    ]);
  }
}
