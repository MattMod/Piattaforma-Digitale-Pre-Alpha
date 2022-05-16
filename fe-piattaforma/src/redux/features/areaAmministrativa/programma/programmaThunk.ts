import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import { setProgramDetails } from './programmaSlice';

const SetProgramDetailsAction = { type: 'programma/SetProgramDetails' };
export const SetProgramDetails =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ ...SetProgramDetailsAction, payload }); // TODO manage dispatch for dev env only
      dispatch(showLoader());
      if (payload.id) {
        await API.put(`/programma/${payload.id}`, {
          ...payload,
          id: undefined,
        });
      } else {
        await API.post('/programma', { ...payload });
      }
      dispatch(setProgramDetails({ ...payload, id: new Date().getTime() }));
    } finally {
      dispatch(hideLoader());
    }
  };
