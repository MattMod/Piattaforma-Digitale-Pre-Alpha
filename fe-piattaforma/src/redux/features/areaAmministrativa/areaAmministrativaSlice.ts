import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { PaginatorI } from '../../../components/Paginator/paginator';

interface AreaAmministrativaStateI {
  list: any[];
  filters: {
    [key: string]:
      | { label: string; value: string | number | any[] }[]
      | undefined;
  };
  filterOptions: {
    [key: string]:
      | { label: string; value: string | number | any[] }[]
      | undefined;
  };
  pagination: {
    pageSize: number;
    pageNumber: number;
  };
  detail: {
    info?: { [key: string]: string };
    ref?: { name: string; status: string; id: string }[];
    del?: { name: string; status: string; id: string }[];
    pagination?: PaginatorI;
    list?: any[];
    idEnteGestore?: string;
  };
}

const initialState: AreaAmministrativaStateI = {
  list: [],
  filters: {
    nameLike: [{ label: 'mario', value: 'mario_1' }],
  },
  filterOptions: {
    policy: [
      { label: 'RFD', value: 1 },
      { label: 'SCD', value: 2 },
    ],
  },
  pagination: {
    pageSize: 8,
    pageNumber: 1,
  },
  detail: {},
};

export const areaAmministrativaSlice = createSlice({
  name: 'areaAmministrativa',
  initialState,
  reducers: {
    cleanEntityFilters: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        let newFilterValue = null;
        if (Array.isArray(state.filters[action.payload.filterKey])) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          newFilterValue = state.filters[action.payload.filterKey].filter(
            (f: any) => f.value !== action.payload.value
          );
          if (!newFilterValue?.length) {
            newFilterValue = null;
          }
        }

        state.filters = {
          ...state.filters,
          [action.payload.filterKey]: newFilterValue,
        };
      } else {
        state.filters = initialState.filters;
      }
    },
    setEntityFilters: (state, action: PayloadAction<any>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setEntityFilterOptions: (state, action: PayloadAction<any>) => {
      state.filterOptions = {
        ...state.filterOptions,
        ...action.payload,
      };
    },
    setEntityPagination: (state, action: PayloadAction<any>) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
    setEntityValues: (state, action: PayloadAction<any>) => {
      state.list = action.payload.data.data.list;
    },
    setEntityDetail: (state, action: PayloadAction<any>) => {
      state.detail = action.payload;
    },
    emptyDetail: (state) => {
      state.detail = {};
    },
  },
});

export const {
  cleanEntityFilters,
  setEntityFilters,
  setEntityFilterOptions,
  setEntityPagination,
  setEntityValues,
  setEntityDetail,
  emptyDetail,
} = areaAmministrativaSlice.actions;

export const selectEntityList = (state: RootState) =>
  state.areaAmministrativa.list;
export const selectEntityFilters = (state: RootState) =>
  state.areaAmministrativa.filters;
export const selectEntityFiltersOptions = (state: RootState) =>
  state.areaAmministrativa.filterOptions;
export const selectEntityPagination = (state: RootState) =>
  state.areaAmministrativa.pagination;
export const selectEntityDetail = (state: RootState) =>
  state.areaAmministrativa.detail;

export default areaAmministrativaSlice.reducer;
