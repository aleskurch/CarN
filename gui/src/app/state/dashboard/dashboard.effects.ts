import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarNumberInterface } from '../../shared/interfaces/car-number.interface';

import { DashboardActions } from './dashboard.actions';
import { DashboardService } from '../../pages/dashboard/services/dashboard.service';

@Injectable()
export class DashboardEffects {
  public getCarNumbers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.getCarNumbersRequest),
      switchMap(() =>
        this.dashboardService.getCarNumbers().pipe(
          map((carNumbers: CarNumberInterface[]) =>
            DashboardActions.getCarNumbersSuccess({
              carNumbers,
            })
          ),
          catchError((error: HttpErrorResponse) => {
            console.log('Error while get car numbers');
            return of(DashboardActions.getCarNumbersError({ error: error }));
          })
        )
      )
    );
  });

  public deleteCarNumber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.deleteCarNumberRequest),
      switchMap(({ carNumber }) =>
        this.dashboardService.deleteCarNumber(carNumber).pipe(
          map(() =>
            DashboardActions.deleteCarNumberSuccess({
              carNumber,
            })
          ),
          catchError((error: HttpErrorResponse) => {
            console.log('Error while deleting');
            return of(DashboardActions.deleteCarNumbersError({ error: error }));
          })
        )
      )
    );
  });

  public editCarNumber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.editCarNumberRequest),
      switchMap(({ carNumber }) =>
        this.dashboardService.editCarNumber(carNumber).pipe(
          map((updatedNumber: CarNumberInterface) =>
            DashboardActions.editCarNumberSuccess({
              carNumber: updatedNumber,
            })
          ),
          catchError((error: HttpErrorResponse) => {
            console.log('Error while edit');
            return of(DashboardActions.editCarNumberError({ error: error }));
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
