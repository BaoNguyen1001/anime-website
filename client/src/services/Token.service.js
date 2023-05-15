const setAccessToken = (token) => {
  return localStorage.setItem('access_token', JSON.stringify(token));
}

const getAccessToken = () => {
  return JSON.parse(localStorage.getItem('access_token'));
};

const isNotExpiredAccessToken = () => {
  const accessToken = getAccessToken();
  if(accessToken) {
    const decodeJWT = parseJwt(accessToken);
    if(decodeJWT.exp < Math.round(Date.now() / 1000)) {
      return false;
    }
    return true;
  }
  return false;
}


const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.refreshToken;
};

const updateAccessToken = (newToken) => {
  const accessToken = newToken;
  return localStorage.setItem('access_token', JSON.stringify(accessToken));
};

const setUser = (user) => {
  return localStorage.setItem('user', JSON.stringify(user));
};

const removeLocalStorage = () => {
  return localStorage.clear();
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};



const TokenService = {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  updateAccessToken,
  setUser,
  removeLocalStorage,
  isNotExpiredAccessToken,
};

export default TokenService;



