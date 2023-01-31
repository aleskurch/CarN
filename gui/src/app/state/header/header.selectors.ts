import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HEADER, HeaderState } from "./header.reducer";

const selectGetFeatureState =
  createFeatureSelector<HeaderState>(HEADER);

export const selectAddCarNumberLoadingStatus = createSelector(
  selectGetFeatureState,
  (state: HeaderState) => state.addCarNumberLoadingStatus
);
