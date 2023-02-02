import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { CarNumberToAddInterface } from '../../shared/interfaces/car-number.interface';

export const HeaderActions = {
  addCarNumberRequest: createAction(
    '[HEADER] add car numbers requested',
    props<{ carNumber: CarNumberToAddInterface | null }>()
  ),
  addCarNumberError: createAction(
    '[HEADER] add car numbers error',
    props<{ error: HttpErrorResponse }>()
  ),
  dropStatus: createAction('[HEADER] drop loading status'),
};
