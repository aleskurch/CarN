import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DASHBOARD, DashboardState } from "./dashboard.reducer";

const selectGetFeatureState =
  createFeatureSelector<DashboardState>(DASHBOARD);

export const selectCarNumbers = createSelector(
  selectGetFeatureState,
  (state: DashboardState) => state.carNumbers
);
export const selectCarNumbersLoadingStatus = createSelector(
  selectGetFeatureState,
  (state: DashboardState) => state.carNumbersLoadingStatus
);
