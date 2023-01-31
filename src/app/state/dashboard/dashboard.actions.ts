import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ICarNumber } from "../../shared/interfaces/car-number.interface";


export const DashboardActions = {
  getCarNumbersRequest: createAction('[DASHBOARD] car numbers requested'),

  getCarNumbersSuccess: createAction(
    '[DASHBOARD] car numbers success',
    props<{ carNumbers: ICarNumber[] | null }>()
  ),

  getCarNumbersError: createAction(
    '[DASHBOARD] car numbers error',
    props<{ error: HttpErrorResponse }>()
  ),

  addCardNumber: createAction(
    '[DASHBOARD] add car numbers',
    props<{ carNumber: ICarNumber | null }>()
  )
};
