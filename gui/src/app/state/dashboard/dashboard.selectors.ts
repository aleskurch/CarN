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

export const selectEditCarNumbersLoadingStatus = createSelector(
  selectGetFeatureState,
  (state: DashboardState) => state.editNumberLoadingStatus
);

export const selectDeleteCarNumbersLoadingStatus = createSelector(
  selectGetFeatureState,
  (state: DashboardState) => state.deleteNumberLoadingStatus
);
