import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ICarNumber } from "../../../interfaces/car-number.interface";
import { BaseService } from "../../../services/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class HeaderService extends BaseService {
  public addCarNumber(newCarNumber: ICarNumber | null): Observable<ICarNumber> {
    return this.post<ICarNumber>('add-car-number', newCarNumber);
  }
}
