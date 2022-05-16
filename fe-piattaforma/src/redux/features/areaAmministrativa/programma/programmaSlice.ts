import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgrammaStateI {
  details?: {
    name: string;
  };
}

const initialState: ProgrammaStateI = {};

export const programmaSlice = createSlice({
  name: 'programma',
  initialState,
  reducers: {
    setProgramDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
  },
});

export const { setProgramDetails } = programmaSlice.actions;

//export const selectProgram = (state: RootState) => state.programma.programma;

export default programmaSlice.reducer;
