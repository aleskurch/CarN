import { createReducer, on } from '@ngrx/store';
import { CarNumberInterface } from '../../shared/interfaces/car-number.interface';

import { DashboardActions } from './dashboard.actions';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';
import { LoadingStatusInterface } from '../../shared/interfaces/loading-status-interface';

export const DASHBOARD = 'dashboard';

export interface DashboardState {
  carNumbersLoadingStatus: LoadingStatusInterface;
  editNumberLoadingStatus: LoadingStatusInterface;
  deleteNumberLoadingStatus: LoadingStatusInterface;
  carNumbers: CarNumberInterface[] | null;
}

const initialState: DashboardState = {
  carNumbersLoadingStatus: DEFAULT_LOADING_STATUS,
  editNumberLoadingStatus: DEFAULT_LOADING_STATUS,
  deleteNumberLoadingStatus: DEFAULT_LOADING_STATUS,
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
      deleteNumberLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    DashboardActions.deleteCarNumberSuccess,
    (state, { carNumber }): DashboardState => ({
      ...state,
      carNumbers:
        state.carNumbers?.filter(
          (existedCarNumber: CarNumberInterface) =>
            existedCarNumber.number !== carNumber?.number
        ) || [],
      deleteNumberLoadingStatus: {
        loading: false,
        loaded: true,
        error: null,
      },
    })
  ),
  on(
    DashboardActions.deleteCarNumbersError,
    (state, { error }): DashboardState => ({
      ...state,
      deleteNumberLoadingStatus: { loading: false, loaded: false, error },
    })
  ),
  on(
    DashboardActions.editCarNumberRequest,
    (state): DashboardState => ({
      ...state,
      editNumberLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    DashboardActions.editCarNumberSuccess,
    (state, { carNumber }): DashboardState => ({
      ...state,
      carNumbers:
        state.carNumbers?.map((existedCarNumber: CarNumberInterface) => {
          if (existedCarNumber.number === carNumber?.number) {
            return carNumber;
          }

          return existedCarNumber;
        }) || [],
      editNumberLoadingStatus: {
        loading: false,
        loaded: true,
        error: null,
      },
    })
  ),
  on(
    DashboardActions.editCarNumberError,
    (state, { error }): DashboardState => ({
      ...state,
      editNumberLoadingStatus: { loading: false, loaded: false, error },
    })
  ),
  on(DashboardActions.dropLoadingStatuses, (state): DashboardState => ({
  ...state,
  editNumberLoadingStatus: DEFAULT_LOADING_STATUS,
  deleteNumberLoadingStatus: DEFAULT_LOADING_STATUS,
}))
);
