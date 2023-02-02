import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  CarNumberInterface,
  CarNumberToAddInterface,
} from '../../../shared/interfaces/car-number.interface';
import { BaseService } from '../../../shared/services/base-http.service';
import { CarNumbersFromApiInterface } from '../interfaces/car-numbers-from-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  public getCarNumbers(): Observable<CarNumberInterface[]> {
    return this.get<CarNumbersFromApiInterface>('car-numbers').pipe(
      map((response: CarNumbersFromApiInterface) => response.carNumbers)
    );
  }

  public deleteCarNumber(
    numberToDelete: string | null
  ): Observable<unknown> {
    return this.delete<unknown>(
      'car-numbers',
      {
        carNumber: numberToDelete || '',
      }
    );
  }

  public editCarNumber(
    numberToUpdate: CarNumberToAddInterface | null
  ): Observable<CarNumberInterface> {
    return this.patch<CarNumberInterface>('car-numbers', numberToUpdate);
  }
}
