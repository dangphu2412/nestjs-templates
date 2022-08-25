import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../config/store';

export const selectAdminState = (state: AppState) => state.user;

export const selectInactiveDates = createSelector(
  selectAdminState,
  state => state.filters.disabledIn
);

export const selectIsSubmitted = createSelector(
  selectAdminState,
  state => state.isSubmitted
);
