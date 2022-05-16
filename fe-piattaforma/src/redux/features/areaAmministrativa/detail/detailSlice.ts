import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export interface UsersLinkedI {
  name: string;
  status: string;
  id: string;
}
export interface DetailDataI {
  info?: { [key: string]: string };
  ref?: UsersLinkedI[];
  del?: UsersLinkedI[];
  //pagination?: PaginatorI;
  list?: any[]; // TODO remove when we have apis and a clearer idea of tyeps
  idEnteGestore?: string;
  roles?: any[]; // TODO remove when we have apis and a clearer idea of tyeps
}

interface AreaAmministrativaDetailStateI {
  data: DetailDataI;
  dataToShow: string;
  listData: any[]; // TODO remove when we have apis and a clearer idea of tyeps
}

const initialState: AreaAmministrativaDetailStateI = {
  data: {},
  listData: [],
  dataToShow: '',
};

export const areaAmministrativaDetailSlice = createSlice({
  name: 'areaAmministrativaDetail',
  initialState,
  reducers: {
    getDetail: (state, action: PayloadAction<any>) => ({
      ...state,
      ...action.payload,
    }),
    emptyDetail: (state) => {
      state.data = {};
    },
    setDataToShow: (state, action: PayloadAction<any>) => {
      state.dataToShow = action.payload;
    },
    setProgramDetail: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setEnteGestoreProgrammaDetail: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setAllProgettiDetail: (state, action: PayloadAction<any>) => {
      state.listData = action.payload;
    },
    setProgettoDetail: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setEnteGestoreProgettoDetail: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setAllEntiPartner: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setEntePartnerDetail: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setAllSedi: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setSedeDetail: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setAllSediDetail: (state, action: PayloadAction<any>) => {
      state.listData = action.payload;
    },
    setAllEntiPartnerDetail: (state, action: PayloadAction<any>) => {
      state.listData = action.payload;
    },
    setAllEntiGestoriProgettoDetail: (state, action: PayloadAction<any>) => {
      state.listData = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const {
  setAllEntiPartner,
  setEnteGestoreProgrammaDetail,
  setEnteGestoreProgettoDetail,
  setEntePartnerDetail,
  setProgettoDetail,
  setSedeDetail,
  setAllSedi,
  setAllProgettiDetail,
  setProgramDetail,
  setDataToShow,
  emptyDetail,
  setAllEntiGestoriProgettoDetail,
  setAllEntiPartnerDetail,
  setAllSediDetail,
  setUserInfo,
} = areaAmministrativaDetailSlice.actions;

export const selectDetailData = (state: RootState) =>
  state.areaAmministrativaDetail.data;
export const selectDetailDataInfo = (state: RootState) =>
  state.areaAmministrativaDetail.data.info;
export const selectDataToShow = (state: RootState) =>
  state.areaAmministrativaDetail.dataToShow;
export const selectListData = (state: RootState) =>
  state.areaAmministrativaDetail.listData;

export default areaAmministrativaDetailSlice.reducer;
