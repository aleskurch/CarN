import { createReducer, on } from '@ngrx/store';

import { HeaderActions } from './header.actions';
import { DashboardActions} from '../dashboard/dashboard.actions';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';
import { LoadingStatusInterface } from '../../shared/interfaces/loading-status-interface';

export const HEADER = 'header';

export interface HeaderState {
  addCarNumberLoadingStatus: LoadingStatusInterface;
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
  ),
  on(
    HeaderActions.dropLoadingStatus,
    (state): HeaderState => ({
      ...state,
      addCarNumberLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  )
);
