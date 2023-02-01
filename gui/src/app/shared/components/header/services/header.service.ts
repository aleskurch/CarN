import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { BaseService } from "../../../services/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class HeaderService extends BaseService {
  public addCarNumber(): Observable<boolean> {
    return this.get<string>('greeting').pipe(map(() => true))
  }
}
