import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CittadinoInfoI {
  name?: string;
  lastName?: string;
  fiscalCode?: string;
  nDoc?: string;
  nationality?: string;
  age?: string;
  degree?: string;
  occupation?: string;
  email?: string;
  phone?: string;
  consensoOTP?: boolean;
  confModulo?: boolean;
  dataConf?: string;
  userId?: string;
}

export interface CittadinoI {
  info: CittadinoInfoI;
  questionari: any[];
}

interface AreaCittadiniStateI {
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
  detail: CittadinoI;
  searchResult: CittadinoInfoI | undefined;
}

const initialState: AreaCittadiniStateI = {
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
  detail: { info: {}, questionari: [] },
  searchResult: {},
};

export const areaCittadiniSlice = createSlice({
  name: 'areaCittadini',
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
    getEntityDetail: (state, action: PayloadAction<any>) => {
      state.detail = action.payload;
    },
    getEntitySearch: (state, action: PayloadAction<any>) => {
      state.searchResult = action.payload;
    },
  },
});

export const {
  cleanEntityFilters,
  setEntityFilters,
  setEntityFilterOptions,
  setEntityPagination,
  setEntityValues,
  getEntityDetail,
  getEntitySearch,
} = areaCittadiniSlice.actions;

export const selectEntityList = (state: RootState) => state.areaCittadini.list;
export const selectEntityFilters = (state: RootState) =>
  state.areaCittadini.filters;
export const selectEntityFiltersOptions = (state: RootState) =>
  state.areaCittadini.filterOptions;
export const selectEntityPagination = (state: RootState) =>
  state.areaCittadini.pagination;
export const selectEntityDetail = (state: RootState) =>
  state.areaCittadini.detail;
export const selectEntitySearchResponse = (state: RootState) =>
  state.areaCittadini.searchResult;

export default areaCittadiniSlice.reducer;
