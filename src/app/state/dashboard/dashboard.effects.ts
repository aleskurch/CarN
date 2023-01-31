import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DashboardActions } from './dashboard.actions';
import { DashboardService } from '../../pages/dashboard/services/dashboard.service';
import { ICarNumber } from '../../pages/dashboard/interfaces/car-number.interface';

@Injectable()
export class DashboardEffects {
  public carNumbers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.getCarNumbersRequest),
      switchMap(() =>
        this.advertisementService.getCarNumbers().pipe(
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

  constructor(
    private actions$: Actions,
    private advertisementService: DashboardService
  ) {}
}
