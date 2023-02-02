import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CarNumberInterface } from '../../../shared/interfaces/car-number.interface';

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
    numberToDelete: CarNumberInterface | null
  ): Observable<Omit<CarNumberInterface, 'holder' | 'registerDate'>> {
    return this.delete<Omit<CarNumberInterface, 'holder' | 'registerDate'>>('delete-car-number', {
      carNumber: numberToDelete?.number || '',
    });
  }

  public editCarNumber(
    numberToUpdate: CarNumberInterface | null
  ): Observable<CarNumberInterface> {
    return this.patch<CarNumberInterface>('update-car-number', numberToUpdate);
  }
}
