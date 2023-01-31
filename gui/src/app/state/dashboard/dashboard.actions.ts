import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ICarNumber } from '../../shared/interfaces/car-number.interface';

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
  ),
  deleteCarNumberRequest: createAction(
    '[DASHBOARD] delete car number requested',
    props<{ carNumber: ICarNumber | null }>()
  ),
  deleteCarNumberSuccess: createAction(
    '[DASHBOARD] delete car number success',
    props<{ carNumber: ICarNumber | null }>()
  ),
  deleteCarNumbersError: createAction(
    '[DASHBOARD] delete car number error',
    props<{ error: HttpErrorResponse }>()
  ),
  editCarNumberRequest: createAction(
    '[DASHBOARD] edit car number requested',
    props<{ carNumber: ICarNumber | null }>()
  ),
  editCarNumberSuccess: createAction(
    '[DASHBOARD] edit car number success',
    props<{ carNumber: ICarNumber | null }>()
  ),
  editCarNumbersError: createAction(
    '[DASHBOARD] edit car number error',
    props<{ error: HttpErrorResponse }>()
  ),
};
