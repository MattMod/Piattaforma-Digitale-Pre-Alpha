import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStateI {
  details?: {
    name: string;
  };
}

const initialState: UserStateI = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

//export const selectProgram = (state: RootState) => state.programma.programma;

export default userSlice.reducer;
