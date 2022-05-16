import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import { setEntePartnerDetails } from './entePartnerSlice';

const SetEntePartnerDetailsAction = {
  type: 'enteGestoreProgetto/SetEnteGestoreProgettoDetails',
};
export const SetEntePartnerDetails =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ ...SetEntePartnerDetailsAction, payload }); // TODO manage dispatch for dev env only
      dispatch(showLoader());
      if (payload.id) {
        await API.put(`/entePartner/${payload.id}`, {
          ...payload,
          id: undefined,
        });
      } else {
        await API.post('/entePartner', { ...payload });
      }
      dispatch(setEntePartnerDetails({ ...payload, id: new Date().getTime() }));
    } finally {
      dispatch(hideLoader());
    }
  };
