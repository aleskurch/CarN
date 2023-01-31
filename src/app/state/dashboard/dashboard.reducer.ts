import { createReducer, on } from '@ngrx/store';

import { DashboardActions } from './dashboard.actions';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';
import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { ICarNumber } from '../../pages/dashboard/interfaces/car-number.interface'

export const DASHBOARD = 'dashboard';

export interface DashboardState {
  carNumbersLoadingStatus: LoadingStatus;
  carNumbers: ICarNumber[] | null;
}

const initialState: DashboardState = {
  carNumbersLoadingStatus: DEFAULT_LOADING_STATUS,
  carNumbers: null,
};

export const DASHBOARD_REDUCER = createReducer(
  initialState,
  on(
    DashboardActions.getCarNumbersRequest,
    (state): DashboardState => ({
      ...state,
      carNumbersLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    DashboardActions.getCarNumbersSuccess,
    (state, { carNumbers }): DashboardState => ({
      ...state,
      carNumbers,
      carNumbersLoadingStatus: {
        loading: false,
        loaded: true,
        error: null,
      },
    })
  ),
  on(
    DashboardActions.getCarNumbersError,
    (state, { error }): DashboardState => ({
      ...state,
      carNumbersLoadingStatus: { loading: false, loaded: false, error },
    })
  )
);
