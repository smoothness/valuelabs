import { createSlice } from '@reduxjs/toolkit'

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    risk: [
      {name: 'bonds', value: 0},
      {name: 'largeCap', value: 0},
      {name: 'midCap', value: 0},
      {name: 'foreign', value: 0},
      {name: 'smallCaps', value: 0}
    ],
    money: [
      {name: 'bonds', value: 0},
      {name: 'largeCap', value: 0},
      {name: 'midCap', value: 0},
      {name: 'foreign', value: 0},
      {name: 'smallCaps', value: 0}
    ]
  },
  reducers: {
    setCalculatorAmounts: (state, action) => {
      state.risk = action.payload;
      state.money = action.payload;
    },
    setMoneyAmounts: (state, action) => {
      state.money = action.payload;
    },
  }
})

export const { setCalculatorAmounts, setMoneyAmounts } = calculatorSlice.actions;
export const calculatorAmountsData = state => state.calculator;
export default calculatorSlice.reducer;