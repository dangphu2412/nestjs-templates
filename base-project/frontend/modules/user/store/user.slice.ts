import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterKey } from '../../shared/common/filter/constant';
import { initialPaginationState } from '../../shared/common/pagination/pagination.reducer';
import { Pagination } from '../../shared/clients/list.api';
import { FilterParam } from '../../shared/common/filter/filter.api';
import { AdminFilter, AdminState } from './user-store.types';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    pagination: {
      page: initialPaginationState.page,
      size: initialPaginationState.pageSize
    },
    filters: {
      query: {
        type: FilterKey.EXACT,
        value: ''
      },
      disabledIn: {
        type: FilterKey.RANGE,
        value: {
          from: '',
          to: ''
        }
      }
    }
  } as AdminState,
  reducers: {
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterParam<AdminFilter>>) => {
      if (action.payload.query) {
        state.filters.query = {
          type: FilterKey.EXACT,
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
    }
  }
});

export const { reducer: userReducer } = userSlice;

export const userActions = userSlice.actions;
