import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import AuthenticationState from './emuns/auth-state.enum';
import {
  hideDialog,
  AppSelector
} from './store';
import AuthService from './services/Auth.service';
import AppRoutes from "./App.routes";
import CustomDialog from "./components/Dialog/CustomDialog";


function App(props) {

  useEffect(() => {
    const authenticationState = AuthService.init();
    if(authenticationState === AuthenticationState.NOT_AUTHENTICATED) {
      AuthService.logout();
    }
  }, [])


  const handleErrorInfoDialogButtonClick = (e, button) => {
    const { errorInfos, dispatch } = props;
    if (errorInfos.length > 0) {
      dispatch(hideDialog());
    }
  };

  const renderErrorInfoDialog = () => {
    // errorInfos includes: type, msgs, icon
    const { errorInfos } = props;
    if(errorInfos.length === 0) {
      return null;
    }
    
    return errorInfos.map((errorInfo) => {
      let title = errorInfo.title || '';
      let text = errorInfo.msgs || '';
      let onOK = errorInfo.onOK || '';
      return (
      <CustomDialog
        title={title}
        text={text}
        onButtonClick={handleErrorInfoDialogButtonClick}
        onOK={onOK}
      />
      );
    });
  };


  return (
    <>
      <div className="App">
        <AppRoutes/>
      </div>
      {renderErrorInfoDialog()}
    </>
  );
}


App.propTypes = {
  authenticatedState: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  errorInfos: PropTypes.arrayOf(PropTypes.any),
}

App.defaultProps = {
  authenticatedState: 'Authenticated',
  errorInfos: [],
}

const mapStateToProps = (state) => ({
  errorInfos: AppSelector.getErrorInfoDialog(state),
  authenticationState: AppSelector.getAuthenticationState(state),
});

export default connect(mapStateToProps)(App);
