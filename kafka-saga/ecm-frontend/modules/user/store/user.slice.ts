import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKey } from '../../shared/common/filter/constant';
import { initialPaginationState } from '../../shared/common/pagination/pagination.reducer';
import { Pagination } from '../../shared/clients/list.api';
import { FilterParam } from '../../shared/common/filter/filter.api';
import { AdminFilter, AdminState } from './user-store.types';

const initialUserState: AdminState = {
  pagination: {
    page: initialPaginationState.page,
    size: initialPaginationState.pageSize
  },
  filters: {
    query: {
      type: FilterKey.LIKE,
      value: ''
    },
    disabledIn: {
      type: FilterKey.RANGE,
      value: {
        from: '',
        to: ''
      }
    }
  },
  isSubmitted: true
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
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
      if (action.payload.disabledIn) {
        state.filters.disabledIn = {
          type: FilterKey.RANGE,
          value: action.payload.disabledIn
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
      if (action.payload.query) {
        state.filters.query = {
          type: FilterKey.LIKE,
          value: action.payload.query
        };
      }
      if (action.payload.disabledIn) {
        state.filters.disabledIn = {
          type: FilterKey.RANGE,
          value: action.payload.disabledIn
        };
      }
    },
    resetFilter: state => {
      state.filters = initialUserState.filters;
    }
  }
});

export const { reducer: userReducer } = userSlice;

export const userActions = userSlice.actions;
