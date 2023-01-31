import {
  Action,
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  UPDATE,
} from '@ngrx/store';

export interface State {}

export const ROOT_REDUCER: ActionReducerMap<State> = {};

export const ROOT_EFFECT = [];

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
