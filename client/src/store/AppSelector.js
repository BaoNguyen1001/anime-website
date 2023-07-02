const AppSelector = {
  getErrorInfoDialog: (state) => state.app.errorInfos,
  getAuthenticationState: (state) => state.app.authenticationState,
  totalLoadingProcess: (state) => state.app.totalLoadingProcess,
  getGenresCollections: (state) => state.app.genresCollections,
};

export default AppSelector;
