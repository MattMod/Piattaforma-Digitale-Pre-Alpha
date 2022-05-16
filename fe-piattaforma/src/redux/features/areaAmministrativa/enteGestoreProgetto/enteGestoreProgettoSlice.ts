import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnteGestoreProgettoStateI {
  details?: {
    name: string;
  };
}

const initialState: EnteGestoreProgettoStateI = {};

export const enteGestoreProgettoSlice = createSlice({
  name: 'enteGestoreProgetto',
  initialState,
  reducers: {
    setEnteGestoreProgettoDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
  },
});

export const { setEnteGestoreProgettoDetails } =
  enteGestoreProgettoSlice.actions;

//export const selectProgram = (state: RootState) => state.programma.programma;

export default enteGestoreProgettoSlice.reducer;
