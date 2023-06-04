const AppSelector = {
  getErrorInfoDialog: (state) => state.app.errorInfos,
  getAuthenticationState: (state) => state.app.authenticationState,
  totalLoadingProcess: (state) => state.app.totalLoadingProcess,
};

export default AppSelector;
