import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ICarNumber } from '../../../shared/interfaces/car-number.interface';

import { BaseService } from '../../../shared/services/base-http.service';
import { ICarNumbersFromApi } from '../interfaces/car-numbers-from-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  public getCarNumbers(): Observable<ICarNumber[]> {
    return this.get<ICarNumbersFromApi>('car-numbers').pipe(
      map((response: ICarNumbersFromApi) => response.carNumbers)
    );
  }

  public deleteCarNumber(): Observable<boolean> {
    return of(true);
  }

  public editCarNumber(): Observable<boolean> {
    return of(true);
  }
}
