import AuthenticationState from "../emuns/auth-state.enum";
import api from "./Api.service";
import TokenService from "./Token.service";
import { store, setAuthenticationState, showDialog } from "../store";

const register = async (userName, password) => {
  const response = await api
    .post("/auth/signup", {
      userName,
      password,
    })
    .then((response) => {
      const { message } = response.data.result;
      return {
        isRegister: true,
        message: message,
        error: "",
      };
    })
    .catch((err) => {
      return {
        isRegister: false,
        message: "",
        error: err.response.data.error,
      };
    });

  return response;
};

const login = async (userName, password) => {
  const response = await api
    .post("/auth/login", {
      userName,
      password,
    })
    .then((response) => {
      const { user, accessToken } = response.data.result;
      if (user) {
        TokenService.setUser(user);
      }
      if (accessToken) {
        TokenService.setAccessToken(accessToken);
      }
      store.dispatch(setAuthenticationState(AuthenticationState.AUTHENTICATED));
      return {
        isLogin: true,
        error: "",
      };
    })
    .catch((err) => {
      return {
        isLogin: false,
        error: err.response.data.error,
      };
    });

  return response;
};

const profile = async () => {
  const response = await api
    .get("/auth/profile")
    .then((res) => {
      const { userProfile } = res.data.result;
      return userProfile;
    })
    .catch((err) => {
      const { error } = err.response.data;
      store.dispatch(
        showDialog({
          msgs: error,
          onOK: () => (window.location.href = "/"),
        })
      );

      throw err;
    });
  return response;
};

const init = () => {
  store.dispatch(setAuthenticationState(AuthenticationState.AUTHENTICATING));
  const isAuthenticated = TokenService.isNotExpiredAccessToken();
  if (isAuthenticated) {
    store.dispatch(setAuthenticationState(AuthenticationState.AUTHENTICATED));
    return AuthenticationState.AUTHENTICATED;
  }
  store.dispatch(setAuthenticationState(AuthenticationState.NOT_AUTHENTICATED));
  return AuthenticationState.NOT_AUTHENTICATED;
};

const logout = () => {
  store.dispatch(setAuthenticationState(AuthenticationState.NOT_AUTHENTICATED));
  TokenService.removeLocalStorage();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  init,
  register,
  login,
  logout,
  profile,
  getCurrentUser,
};

export default AuthService;
