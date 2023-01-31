import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarNumber } from "../../shared/interfaces/car-number.interface";

import { DashboardActions } from './dashboard.actions';
import { DashboardService } from '../../pages/dashboard/services/dashboard.service';

@Injectable()
export class DashboardEffects {
  public getCarNumbers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.getCarNumbersRequest),
      switchMap(() =>
        this.dashboardService.getCarNumbers().pipe(
          map((carNumbers: ICarNumber[]) =>
            DashboardActions.getCarNumbersSuccess({
              carNumbers,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(DashboardActions.getCarNumbersError({ error: error }))
          )
        )
      )
    );
  });

  public deleteCarNumber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.deleteCarNumberRequest),
      switchMap(({carNumber}) =>
        this.dashboardService.deleteCarNumber().pipe(
          map(() =>
            DashboardActions.deleteCarNumberSuccess({
              carNumber,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(DashboardActions.deleteCarNumbersError({ error: error }))
          )
        )
      )
    );
  });

  public editCarNumber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.editCarNumberRequest),
      switchMap(({carNumber}) =>
        this.dashboardService.editCarNumber().pipe(
          map(() =>
            DashboardActions.editCarNumberSuccess({
              carNumber,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(DashboardActions.editCarNumbersError({ error: error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
