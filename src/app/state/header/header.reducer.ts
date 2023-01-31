import { createReducer, on } from '@ngrx/store';

import { HeaderActions } from './header.actions';
import { DashboardActions} from '../dashboard/dashboard.actions';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';
import { LoadingStatus } from '../../shared/interfaces/loading-status';

export const HEADER = 'header';

export interface HeaderState {
  addCarNumberLoadingStatus: LoadingStatus;
}

const initialState: HeaderState = {
  addCarNumberLoadingStatus: DEFAULT_LOADING_STATUS,
};

export const HEADER_REDUCER = createReducer(
  initialState,
  on(
    HeaderActions.addCarNumberRequest,
    (state): HeaderState => ({
      ...state,
      addCarNumberLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    DashboardActions.addCardNumber,
    (state): HeaderState => ({
      ...state,
      addCarNumberLoadingStatus: {
        loading: false,
        loaded: true,
        error: null,
      },
    })
  ),
  on(
    HeaderActions.addCarNumberError,
    (state, { error }): HeaderState => ({
      ...state,
      addCarNumberLoadingStatus: { loading: false, loaded: false, error },
    })
  )
);
