import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import { setSediDetails } from './sediSlice';

const SetSediDetailsAction = { type: 'sedi/SetSediDetails' };
export const SetSediDetails = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    console.log({ payload });
    dispatch({ ...SetSediDetailsAction, payload }); // TODO manage dispatch for dev env only
    dispatch(showLoader());
    if (payload.id) {
      await API.put(`/sedi/${payload.id}`, {
        ...payload,
        id: undefined,
      });
    } else {
      await API.post('/sedi', { ...payload });
    }
    dispatch(setSediDetails({ ...payload, id: new Date().getTime() }));
  } finally {
    dispatch(hideLoader());
  }
};
