import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CarNumberInterface } from "../../../interfaces/car-number.interface";
import { BaseService } from "../../../services/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class HeaderService extends BaseService {
  public addCarNumber(newCarNumber: CarNumberInterface | null): Observable<CarNumberInterface> {
    return this.post<CarNumberInterface>('add-car-number', newCarNumber);
  }
}
