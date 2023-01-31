import {
  Action,
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  UPDATE,
} from '@ngrx/store';

import {
  DASHBOARD,
  DASHBOARD_REDUCER,
  DashboardState,
} from './dashboard/dashboard.reducer';
import { DashboardEffects } from './dashboard/dashboard.effects';
import { HeaderEffects } from './header/header.effects';
import { HEADER, HEADER_REDUCER, HeaderState } from './header/header.reducer';

export interface State {
  [DASHBOARD]: DashboardState;
  [HEADER]: HeaderState;
}

export const ROOT_REDUCER: ActionReducerMap<State> = {
  [DASHBOARD]: DASHBOARD_REDUCER,
  [HEADER]: HEADER_REDUCER,
};

export const ROOT_EFFECT = [DashboardEffects, HeaderEffects];

export const hydrationMetaReducer = (
  reducer: ActionReducer<State>
): ActionReducer<State> => {
  return (state: State | undefined, action: Action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};

export const META_REDUCER: MetaReducer<State>[] = [hydrationMetaReducer];
