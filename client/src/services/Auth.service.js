import AuthenticationState from '../emuns/auth-state.enum';
import api from './Api.service';
import TokenService from './Token.service';
import { store, setAuthenticationState } from '../store';

const register = async (username, password, setMessage, setIsError) => {
  return await api.post("/auth/signup", {
    username,
    password
  })
  .then((response) => {
    const { message } = response.data;
    if(message) {
      setMessage(message);
      setIsError(false);
    }
  })
  .catch((err) => {
    setMessage(err.response.data.error);
    setIsError(true);
  })
};

const login = async (username, password, setMessage, navigate) => {
  return await api
    .post("/auth/login", {
      username,
      password
    })
    .then((response) => {
      const { user, accessToken } = response.data;
      if (user) {
       
        TokenService.setUser(user);
      }
      if(accessToken) {
        TokenService.setAccessToken(accessToken);
      }
      navigate('/')
    })
    .catch((err) => {
      setMessage(err.response.data.error);
    })
};


const init = () => {
  store.dispatch(setAuthenticationState(AuthenticationState.AUTHENTICATING));
  const isAuthenticated = TokenService.isNotExpiredAccessToken();
  if(isAuthenticated) {
    store.dispatch(setAuthenticationState(AuthenticationState.AUTHENTICATED));
    return AuthenticationState.AUTHENTICATED;
  }
  store.dispatch(setAuthenticationState(AuthenticationState.NOT_AUTHENTICATED));
  return AuthenticationState.NOT_AUTHENTICATED;
}

const logout = () => {
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
  getCurrentUser,
}

export default AuthService;