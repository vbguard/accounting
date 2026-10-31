import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    startDate: "",
    endDate: "",
    accountId: "all",
    type: "all",
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.filters.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.filters.endDate = action.payload;
    },
    setAccountFilter: (state, action) => {
      state.filters.accountId = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
    },
  },
});

export const { setStartDate, setEndDate, setAccountFilter, setTypeFilter } = dashboardSlice.actions;
export default dashboardSlice.reducer;
