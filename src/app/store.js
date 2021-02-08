import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../features/chart/chartSlice';
import calculatorReducer from '../features/calculator/calculatorSlice';

export default configureStore({
  reducer: {
    chart: chartReducer,
    calculator: calculatorReducer,
  },
});
