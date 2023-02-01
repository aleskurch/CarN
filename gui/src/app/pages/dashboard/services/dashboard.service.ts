import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  public deleteCarNumber(
    numberToDelete: ICarNumber | null
  ): Observable<Omit<ICarNumber, 'holder' | 'registerDate'>> {
    return this.delete<Omit<ICarNumber, 'holder' | 'registerDate'>>('delete-car-number', {
      carNumber: numberToDelete?.number || '',
    });
  }

  public editCarNumber(
    numberToUpdate: ICarNumber | null
  ): Observable<ICarNumber> {
    return this.patch<ICarNumber>('update-car-number', numberToUpdate);
  }
}
