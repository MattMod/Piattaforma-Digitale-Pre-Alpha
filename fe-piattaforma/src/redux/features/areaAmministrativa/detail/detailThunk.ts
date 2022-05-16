import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import {
  setEnteGestoreProgrammaDetail,
  setSedeDetail,
  setProgettoDetail,
  setAllProgettiDetail,
  //setAllEntiPartner,
  setEnteGestoreProgettoDetail,
  setEntePartnerDetail,
  // setAllSedi,
  setProgramDetail,
  setAllSediDetail,
  setAllEntiPartnerDetail,
  setAllEntiGestoriProgettoDetail,
  setUserInfo,
} from './detailSlice';
//import { RootState } from '../../../store';

const GetProgrammaDetailAction = {
  type: 'areaAmministrativaDetail/GetProgrammaDetail',
};
export const GetProgrammaDetail =
  (programId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetProgrammaDetailAction, programId });
      const res = await API.get(`programma/${programId}`);
      if (res?.data?.data) {
        dispatch(setProgramDetail(res.data.data));
      }
    } catch (e) {
      console.log('area amministrativa detail GetProgrammaDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };
const GetEnteGestoreProgrammaAction = {
  type: 'areaAmministrativaDetail/GetEnteGestoreProgrammaDetail',
};
export const GetEnteGestoreProgrammaDetail =
  (programId: string, enteId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetEnteGestoreProgrammaAction, programId });
      const res = await API.get(`ente/${programId}/gestoreProgramma/${enteId}`);
      if (res?.data?.data) {
        dispatch(setEnteGestoreProgrammaDetail(res.data.data));
      }
    } catch (e) {
      console.log(
        'area amministrativa detail GetEnteGestoreProgrammaDetail',
        e
      );
    } finally {
      dispatch(hideLoader());
    }
  };
const GetAllProgettiAction = {
  type: 'areaAmministrativaDetail/GetAllProgettiDetail',
};
export const GetAllProgettiDetail = () => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoader());
    dispatch({ ...GetAllProgettiAction });
    const res = await API.get(`progetti/all`);
    if (res?.data?.data?.list) {
      dispatch(setAllProgettiDetail(res.data.data.list));
    }
  } catch (e) {
    console.log('area amministrativa detail GetAllProgrammiDetail', e);
  } finally {
    dispatch(hideLoader());
  }
};

const GetProgettoDetailAction = {
  type: 'areaAmministrativaDetail/GetProgettoDetail',
};
export const GetProgettoDetail =
  (projectId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetProgettoDetailAction, projectId });
      const res = await API.get(`progetto/${projectId}`);
      if (res?.data?.data) {
        dispatch(setProgettoDetail(res.data.data));
      }
    } catch (e) {
      console.log('area amministrativa detail GetProgettoDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetEnteGestoreProgettoAction = {
  type: 'areaAmministrativaDetail/GetEnteGestoreProgettoDetail',
};
export const GetEnteGestoreProgettoDetail =
  (projectId: string, idEnte: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetEnteGestoreProgettoAction, projectId, idEnte });
      const res = await API.get(`ente/${projectId}/gestoreProgetto/${idEnte}`);
      if (res?.data?.data) {
        dispatch(setEnteGestoreProgettoDetail(res.data.data));
      }
    } catch (e) {
      console.log('area amministrativa detail GetEnteGestoreProgettoDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetEntePartnerDetailAction = {
  type: 'areaAmministrativaDetail/GetEntePartnerDetail',
};
export const GetEntePartnerDetail =
  (projectId: string, idEnte: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetEntePartnerDetailAction, projectId });
      const res = await API.get(`ente/${projectId}/partner/${idEnte}`);
      if (res?.data?.data) {
        dispatch(setEntePartnerDetail(res.data.data));
      }
    } catch (e) {
      console.log('area amministrativa detail GetEntePartnerDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetSedeDetailAction = {
  type: 'areaAmministrativaDetail/GetSedeDetail',
};
export const GetSedeDetail =
  (projectId: string, idEnte: string, sedeId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetSedeDetailAction, projectId });
      const res = await API.get(`ente-sede/${projectId}/${idEnte}/${sedeId}`);
      if (res?.data?.data) {
        dispatch(setSedeDetail(res.data.data));
      }
    } catch (e) {
      console.log('area amministrativa detail GetEntePartnerDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetAllSediDetailAction = {
  type: 'areaAmministrativaDetail/GetAllSediDetail',
};
export const GetAllSediDetail =
  (projectId: string, idEnte: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetAllSediDetailAction, projectId, idEnte });
      const res = await API.get(`ente-sede/${projectId}/${idEnte}/all`);
      if (res?.data?.data?.list) {
        dispatch(setAllSediDetail(res.data.data.list));
      }
    } catch (e) {
      console.log('area amministrativa detail GetAllSediDetailAction', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetAllEntiPartnerDetailAction = {
  type: 'areaAmministrativaDetail/GetAllEntiPartnerDetail',
};
export const GetAllEntiPartnerDetail =
  (projectId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetAllEntiPartnerDetailAction, projectId });
      const res = await API.get(`ente/${projectId}/partner/all`);
      if (res?.data?.data?.list) {
        dispatch(setAllEntiPartnerDetail(res.data.data.list));
      }
    } catch (e) {
      console.log('area amministrativa detail GetAllEntiPartnerDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetAllEntiGestoreProgettoDetailAction = {
  type: 'areaAmministrativaDetail/GetAllEntiGestoreProgettoDetail',
};
export const GetAllEntiGestoreProgettoDetail =
  (projectId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ ...GetAllEntiGestoreProgettoDetailAction, projectId });
      const res = await API.get(`ente/${projectId}/gestoreProgetto/all`);
      if (res?.data?.data?.list) {
        dispatch(setAllEntiGestoriProgettoDetail(res.data.data.list));
      }
    } catch (e) {
      console.log('area amministrativa detail GetAllEntiPartnerDetail', e);
    } finally {
      dispatch(hideLoader());
    }
  };

const GetUserInfoAction = {
  type: 'areaAmministrativaDetail/GetUserInfo',
};
export const GetUserInfo = (userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoader());
    dispatch({ ...GetUserInfoAction, userId });
    const res = await API.get(`utente/${userId}`);
    if (res?.data?.data) {
      dispatch(setUserInfo(res.data.data));
    }
  } catch (e) {
    console.log('area amministrativa detail GetAllEntiPartnerDetail', e);
  } finally {
    dispatch(hideLoader());
  }
};
