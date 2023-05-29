import axios from "axios";
import TokenService from './Token.service';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_AUTH_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if(token) {
      config.headers['x_authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if((err.response.status === 403 && !originalConfig._retry)) {
      originalConfig._retry = true;

      try {
        const rs = await instance.post("/auth/refresh", {
          refreshToken: TokenService.getRefreshToken(),
        });

        const { accessToken } = rs.data;
        TokenService.updateAccessToken(accessToken);
        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
)

export default instance;