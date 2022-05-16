import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnteGestoreProgrammaStateI {
  details?: {
    name: string;
  };
}

const initialState: EnteGestoreProgrammaStateI = {};

export const enteGestoreProgettoSlice = createSlice({
  name: 'enteGestoreProgramma',
  initialState,
  reducers: {
    setEnteGestoreProgrammaDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
  },
});

export const { setEnteGestoreProgrammaDetails } =
  enteGestoreProgettoSlice.actions;

//export const selectProgram = (state: RootState) => state.programma.programma;

export default enteGestoreProgettoSlice.reducer;
