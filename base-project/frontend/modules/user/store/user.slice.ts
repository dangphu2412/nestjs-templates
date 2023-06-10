import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNil } from '@/modules/shared/utils';
import { FilterKey, FilterParam } from '@/modules/shared/common/filter';
import { Pagination } from '@/modules/shared/clients';
import { initialPaginationState } from '@/modules/shared/common/pagination/pagination.reducer';
import { getFilterDateRange } from '@/modules/shared/utils/date.utils';
import { AdminFilter, AdminState } from './user-store.types';

function getInitialUserState(): AdminState {
  const dateRange = getFilterDateRange();

  return {
    pagination: {
      page: initialPaginationState.page,
      size: initialPaginationState.pageSize
    },
    filters: {
      query: {
        type: FilterKey.LIKE,
        value: ''
      },
      joinedIn: {
        type: FilterKey.RANGE,
        value: {
          fromDate: dateRange.fromDate,
          toDate: dateRange.toDate
        }
      },
      memberType: {
        type: FilterKey.EXACT,
        value: ''
      }
    },
    isSubmitted: true
  };
}

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUserState(),
  reducers: {
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.isSubmitted = true;
      state.pagination = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterParam<AdminFilter>>) => {
      if (action.payload.query) {
        state.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
        return;
      }

      if (action.payload.joinedIn) {
        state.filters.joinedIn = {
          type: FilterKey.RANGE,
          value: action.payload.joinedIn
        };
      }

      if (action.payload.memberType !== undefined) {
        state.filters.memberType = {
          type: FilterKey.EXACT,
          value: action.payload.memberType
        };
      }
    },
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    submitWithFilter: (
      state,
      action: PayloadAction<FilterParam<AdminFilter>>
    ) => {
      state.isSubmitted = true;
      if (isNil(action.payload.query)) {
        state.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
      }

      if (action.payload.joinedIn) {
        state.filters.joinedIn = {
          type: FilterKey.RANGE,
          value: action.payload.joinedIn
        };
      }
    },
    resetFilter: state => {
      state.filters = getInitialUserState().filters;
    }
  }
});

export const { reducer: userReducer } = userSlice;

export const userActions = userSlice.actions;
