import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
  name: "datajson",
  initialState: {
    value: [],
    seachvalue: [],
    searchletters: "",
  },
  reducers: {
    update: (state, action) => {
      state.value = [action.payload];
    },
    adddata: (state, action) => {
      state.seachvalue = [action.payload];
    },
    searchdata: (state, action) => {
      state.searchletters = [action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { update, adddata, searchdata } = apiSlice.actions;

export default apiSlice.reducer;
