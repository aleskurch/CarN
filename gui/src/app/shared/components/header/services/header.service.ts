import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CarNumberInterface, CarNumberToAddInterface } from "../../../interfaces/car-number.interface";
import { BaseService } from "../../../services/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class HeaderService extends BaseService {
  public addCarNumber(newCarNumber: CarNumberToAddInterface | null): Observable<CarNumberInterface> {
    return this.post<CarNumberInterface>('car-numbers', newCarNumber);
  }
}
