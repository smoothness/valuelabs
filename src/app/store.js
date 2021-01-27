import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../features/chart/chartSlice';

export default configureStore({
  reducer: {
    chart: chartReducer,
  },
});
