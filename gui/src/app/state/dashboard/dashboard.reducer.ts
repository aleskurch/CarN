import { createReducer, on } from '@ngrx/store';
import { ICarNumber } from '../../shared/interfaces/car-number.interface';

import { DashboardActions } from './dashboard.actions';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';
import { LoadingStatus } from '../../shared/interfaces/loading-status';

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
  ),
  on(DashboardActions.addCardNumber, (state, { carNumber }) => ({
    ...state,
    carNumbers: carNumber
      ? [carNumber, ...(state.carNumbers || [])]
      : state.carNumbers,
  })),
  on(
    DashboardActions.deleteCarNumberRequest,
    (state): DashboardState => ({
      ...state,
      carNumbersLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    DashboardActions.deleteCarNumberSuccess,
    (state, { carNumber }): DashboardState => ({
      ...state,
      carNumbers:
        state.carNumbers?.filter(
          (existedCarNumber: ICarNumber) =>
            existedCarNumber.number !== carNumber?.number
        ) || [],
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
  ),
  on(
    DashboardActions.editCarNumberRequest,
    (state): DashboardState => ({
      ...state,
      carNumbersLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    DashboardActions.editCarNumberSuccess,
    (state, { carNumber }): DashboardState => ({
      ...state,
      carNumbers:
        state.carNumbers?.map((existedCarNumber: ICarNumber) => {
          if (existedCarNumber.number === carNumber?.number) {
            return carNumber;
          }

          return existedCarNumber;
        }) || [],
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
