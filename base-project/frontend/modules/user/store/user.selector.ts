import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../config/store';

export const selectAdminState = (state: AppState) => state.user;

export const selectQueryUsersKey = createSelector(
  selectAdminState,
  ({ filters, pagination }) => {
    return [
      'QUERY_USERS',
      pagination.page,
      pagination.size,
      filters.query.value,
      filters.disabledIn.value.from,
      filters.disabledIn.value.to
    ];
  }
);

export const selectInactiveDates = createSelector(
  selectAdminState,
  state => state.filters.disabledIn
);

export const selectIsSubmitted = createSelector(
  selectAdminState,
  state => state.isSubmitted
);
