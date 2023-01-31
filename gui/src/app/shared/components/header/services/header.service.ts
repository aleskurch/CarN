import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from "../../../services/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class HeaderService extends BaseService {
  public addCarNumber(): Observable<boolean> {
    return of(true);
  }
}
