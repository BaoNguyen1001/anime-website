const AppSelector = {
  getErrorInfoDialog: (state)  => state.app.errorInfos,
  getAuthenticationState: (state) => state.app.authenticationState,
}


export default AppSelector;