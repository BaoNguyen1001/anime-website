import axios from "axios";
import TokenService from "./Token.service";
import { store, actionLoading, actionLoaded } from "../store";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token && config.baseURL === "http://localhost:5000/api") {
      config.headers["x_authorization"] = token;
    }
    store.dispatch(actionLoading());
    console.log("1111", config);
    return config;
  },
  (error) => {
    store.dispatch(actionLoading());
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    store.dispatch(actionLoaded());
    return res;
  },
  async (err) => {
    store.dispatch(actionLoaded());
    const originalConfig = err.config;
    if (err?.response?.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const rs = await instance.post("/auth/refresh", {
          refreshToken: TokenService.getRefreshToken(),
        });

        const {
          data: { data: accessToken },
        } = rs;
        TokenService.updateAccessToken(accessToken);
        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
