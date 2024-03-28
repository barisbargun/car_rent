import baseAxios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

let token = "";

export const axios = baseAxios.create({
  baseURL: process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL :"http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const fetchNewToken = async () => {
  try {
    const token: string = await axios
      .get("/refresh")
      .then((res: any) => res.data.token);
    return token;
  } catch (error) {
    return null;
  }
};

const refreshAuth = async (failedRequest: any) => {
  const newToken = await fetchNewToken();
  if (newToken) {
    token = "Bearer " + newToken;
    return Promise.resolve(newToken);
  } else {
    return Promise.reject(failedRequest);
  }
};

createAuthRefreshInterceptor(axios, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = token;
    return config;
  }, (error) => Promise.reject(error)
)