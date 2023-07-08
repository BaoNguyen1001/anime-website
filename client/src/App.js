import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthenticationState from "./emuns/auth-state.enum";
import {
  hideDialog,
  AppSelector,
  setGenresCollections,
  setSeasonCollections,
} from "./store";
import AuthService from "./services/Auth.service";
import AppRoutes from "./App.routes";
import CustomDialog from "./components/Dialog/CustomDialog";
import { DefaultLoading } from "./components/Base";
import api from "./services/Api.service";
import { GenresCollectionQuery } from "./hooks/searchQueryStrings";
function App(props) {
  const { genresCollections } = props;
  useEffect(() => {
    const authenticationState = AuthService.init();
    if (authenticationState === AuthenticationState.NOT_AUTHENTICATED) {
      AuthService.logout();
    }

    if (genresCollections.length === 0) {
      getGenresCollections();
    }

    initialSeasonCollections();
  }, []);

  const getGenresCollections = async () => {
    const { dispatch } = props;
    const res = await api({
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: GenresCollectionQuery,
      },
    }).catch((err) => {
      console.log(err);
    });

    dispatch(setGenresCollections(res?.data?.data?.genres));
  };

  const initialSeasonCollections = () => {
    const { dispatch, seasonCollections } = props;
    let years = seasonCollections?.years || [];
    let seasons = seasonCollections?.seasons || [];

    if (!seasonCollections.years || seasonCollections?.years.length === 0) {
      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= currentYear - 20; i--) {
        years.push(i.toString());
      }
    }
    if (!seasonCollections.seasons || seasonCollections?.seasons.length === 0) {
      seasons = ["SPRING", "SUMMER", "FALL", "WINTER"];
    }

    dispatch(setSeasonCollections({ years, seasons }));
  };

  const handleErrorInfoDialogButtonClick = (e, button) => {
    const { errorInfos, dispatch } = props;
    if (errorInfos.length > 0) {
      dispatch(hideDialog());
    }
  };

  const renderErrorInfoDialog = () => {
    // errorInfos includes: type, msgs, icon
    const { errorInfos } = props;
    if (errorInfos.length === 0) {
      return null;
    }

    return errorInfos.map((errorInfo) => {
      let title = errorInfo.title || "";
      let text = errorInfo.msgs || "";
      let onOK = errorInfo.onOK || "";
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
      <div className="App" style={{ height: "100vh" }}>
        <AppRoutes />
      </div>
      {renderErrorInfoDialog()}
      <DefaultLoading />
    </>
  );
}

App.propTypes = {
  authenticatedState: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  errorInfos: PropTypes.arrayOf(PropTypes.any),
  genresCollections: PropTypes.arrayOf(PropTypes.any),
};

App.defaultProps = {
  authenticatedState: "Authenticated",
  errorInfos: [],
  genresCollections: [],
};

const mapStateToProps = (state) => ({
  errorInfos: AppSelector.getErrorInfoDialog(state),
  authenticationState: AppSelector.getAuthenticationState(state),
  genresCollections: AppSelector.getGenresCollections(state),
  seasonCollections: AppSelector.getSeasonCollections(state),
});

export default connect(mapStateToProps)(App);
