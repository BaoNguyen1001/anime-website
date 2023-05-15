import {configureStore} from '@reduxjs/toolkit';
import appReducer from './AppReducer';

export const store = configureStore({
  reducer: {
    app: appReducer
  },
});