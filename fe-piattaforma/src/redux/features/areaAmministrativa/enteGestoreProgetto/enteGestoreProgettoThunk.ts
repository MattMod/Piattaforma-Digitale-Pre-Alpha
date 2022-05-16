import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import { setEnteGestoreProgettoDetails } from './enteGestoreProgettoSlice';

const SetEnteGestoreProgettoDetailsAction = {
  type: 'enteGestoreProgetto/SetEnteGestoreProgettoDetails',
};
export const SetProgramDetails =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ ...SetEnteGestoreProgettoDetailsAction, payload }); // TODO manage dispatch for dev env only
      dispatch(showLoader());
      if (payload.id) {
        await API.put(`/enteGestoreProgetto/${payload.id}`, {
          ...payload,
          id: undefined,
        });
      } else {
        await API.post('/enteGestoreProgetto', { ...payload });
      }
      dispatch(
        setEnteGestoreProgettoDetails({ ...payload, id: new Date().getTime() })
      );
    } finally {
      dispatch(hideLoader());
    }
  };
