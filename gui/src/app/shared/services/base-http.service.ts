import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {}

  public get<T>(url: string, params?: Record<string, string>): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + url, {
      ...this.httpOptions,
      params,
    });
  }

  public post<T>(url: string, data: object | null): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl + url, data, this.httpOptions);
  }

  public patch<T>(url: string, data: object): Observable<T> {
    return this.httpClient.patch<T>(this.apiUrl + url, data, this.httpOptions);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(this.apiUrl + url, this.httpOptions);
  }
}
