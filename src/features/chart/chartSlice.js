import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    riskSelected: false,
    riskData: [],
  },
  reducers: {
    changeRiskGraphData: (state, action) => {
      state.riskSelected = true;
      state.riskData = action.payload;
    },
  },
});

export const { changeRiskGraphData } = chartSlice.actions;
export const selectRiskData = state => state.chart.riskData;
export default chartSlice.reducer;