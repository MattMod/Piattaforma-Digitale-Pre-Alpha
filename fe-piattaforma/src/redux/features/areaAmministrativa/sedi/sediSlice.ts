import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SediStateI {
  details?: {
    name: string;
  };
}

const initialState: SediStateI = {};

export const sediSlice = createSlice({
  name: 'sedi',
  initialState,
  reducers: {
    setSediDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
  },
});

export const { setSediDetails } = sediSlice.actions;

//export const selectProgram = (state: RootState) => state.programma.programma;

export default sediSlice.reducer;
