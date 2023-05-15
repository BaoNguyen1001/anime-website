import { isEqual } from 'lodash'
import { createSlice } from "@reduxjs/toolkit";
import AuthenticationState from '../emuns/auth-state.enum';

const initialState = {
  authenticatedState: AuthenticationState.AUTHENTICATED,
  errorInfos: []
};

const isErrorExisting = (currentErrors, newError) => {
  return currentErrors.some((dialog) => isEqual(dialog, newError));
};


export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showDialog: (state, action) => {
      if (isErrorExisting(state.errorInfos, action.payload)) {
        return state;
      }
      return {
        ...state,
        errorInfos: [...state.errorInfos, { ...action.payload }],
      };
    },
    hideDialog: (state) => {
      return {
        ...state,
        errorInfos: [...state.errorInfos.slice(0, -1)],
      }
    },
    setAuthenticationState: (state, action) => {  
      return {
        ...state,
        authenticatedState: action.payload,
      }
    }
  }
 });

export const { 
  showDialog,
  hideDialog,
  setAuthenticationState,
} = AppSlice.actions;

export default AppSlice.reducer;