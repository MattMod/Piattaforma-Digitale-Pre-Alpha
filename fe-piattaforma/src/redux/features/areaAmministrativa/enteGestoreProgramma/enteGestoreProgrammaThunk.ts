import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import { setEnteGestoreProgrammaDetails } from './enteGestoreProgrammaSlice';

const SetEnteGestoreProgrammaDetailsAction = {
  type: 'enteGestoreProgramma/SetEnteGestoreProgrammaDetails',
};
export const SetEnteGestoreProgrammaDetails =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ ...SetEnteGestoreProgrammaDetailsAction, payload }); // TODO manage dispatch for dev env only
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
        setEnteGestoreProgrammaDetails({ ...payload, id: new Date().getTime() })
      );
    } finally {
      dispatch(hideLoader());
    }
  };
