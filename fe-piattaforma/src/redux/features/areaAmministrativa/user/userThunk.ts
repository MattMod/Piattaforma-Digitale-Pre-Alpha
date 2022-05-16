import { Dispatch } from '@reduxjs/toolkit';
import API from '../../../../utils/apiHelper';
import { hideLoader, showLoader } from '../../app/appSlice';
import { setUserDetails } from './userSlice';

const SetUserDetailsAction = {
  type: 'user/SetUserDetails',
};
export const SetUSerDetails = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ ...SetUserDetailsAction, payload }); // TODO manage dispatch for dev env only
    dispatch(showLoader());
    if (payload.id) {
      await API.put(`/user/${payload.id}`, {
        ...payload,
        id: undefined,
      });
    } else {
      await API.post('/user', { ...payload });
    }
    dispatch(setUserDetails({ ...payload, id: new Date().getTime() }));
  } finally {
    dispatch(hideLoader());
  }
};
