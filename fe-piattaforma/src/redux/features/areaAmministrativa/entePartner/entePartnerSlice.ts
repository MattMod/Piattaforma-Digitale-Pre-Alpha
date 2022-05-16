import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EntePartnerStateI {
  details?: {
    name: string;
  };
}

const initialState: EntePartnerStateI = {};

export const entePartnerSlice = createSlice({
  name: 'entePartner',
  initialState,
  reducers: {
    setEntePartnerDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
  },
});

export const { setEntePartnerDetails } = entePartnerSlice.actions;

//export const selectProgram = (state: RootState) => state.programma.programma;

export default entePartnerSlice.reducer;
