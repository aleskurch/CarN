import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CarNumberInterface } from '../../shared/interfaces/car-number.interface';

export const DashboardActions = {
  getCarNumbersRequest: createAction('[DASHBOARD] car numbers requested'),
  getCarNumbersSuccess: createAction(
    '[DASHBOARD] car numbers success',
    props<{ carNumbers: CarNumberInterface[] | null }>()
  ),
  getCarNumbersError: createAction(
    '[DASHBOARD] car numbers error',
    props<{ error: HttpErrorResponse }>()
  ),
  addCardNumber: createAction(
    '[DASHBOARD] add car numbers',
    props<{ carNumber: CarNumberInterface | null }>()
  ),
  deleteCarNumberRequest: createAction(
    '[DASHBOARD] delete car number requested',
    props<{ carNumber: CarNumberInterface | null }>()
  ),
  deleteCarNumberSuccess: createAction(
    '[DASHBOARD] delete car number success',
    props<{ carNumber: CarNumberInterface | null }>()
  ),
  deleteCarNumbersError: createAction(
    '[DASHBOARD] delete car number error',
    props<{ error: HttpErrorResponse }>()
  ),
  editCarNumberRequest: createAction(
    '[DASHBOARD] edit car number requested',
    props<{ carNumber: CarNumberInterface | null }>()
  ),
  editCarNumberSuccess: createAction(
    '[DASHBOARD] edit car number success',
    props<{ carNumber: CarNumberInterface | null }>()
  ),
  editCarNumberError: createAction(
    '[DASHBOARD] edit car number error',
    props<{ error: HttpErrorResponse }>()
  ),
  dropLoadingStatuses: createAction('[DASHBOARD] drop loading statuses'),
};
