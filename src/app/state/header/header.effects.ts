import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from "../../shared/components/header/services/header.service";

import { HeaderActions } from './header.actions';
import { DashboardActions } from '../dashboard/dashboard.actions';

@Injectable()
export class HeaderEffects {
  public carNumber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HeaderActions.addCarNumberRequest),
      switchMap(({ carNumber }) =>
        this.advertisementService.addCarNumber().pipe(
          map(
            () => DashboardActions.addCardNumber({ carNumber }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(HeaderActions.addCarNumberError({ error: error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private advertisementService: HeaderService
  ) {}
}
