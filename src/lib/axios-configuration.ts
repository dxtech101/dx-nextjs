import axios from "axios";
// constants
import { BASE_STAGING, BASE_LOCAL, BASE_PROD, REFRESH_TOKEN } from "@/constants/api-routes";
// cookie helpers
import { logout, getAuthenticationToken, getRefreshToken, setAccessToken } from "./cookie";

const base_url =
  process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "production"
    ? BASE_PROD
    : process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "staging"
    ? BASE_STAGING
    : BASE_LOCAL;

export const axiosInstance = axios.create({
      baseURL: base_url,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
    },
});

export const setAxiosHeader = (token: string) => {
  if (token) axiosInstance.defaults.headers.common["Authorization"] = `JWT ${token}`;
  else axiosInstance.defaults.headers.common["Authorization"] = "";
};

(function () {
  let authToken: any = getAuthenticationToken();
  authToken = authToken ? JSON.parse(authToken) : null;
  if (authToken && authToken.access_token) setAxiosHeader(authToken.access_token);
})();


const UNAUTHORIZED = [401];
axiosInstance.interceptors.response.use(
  (response:any) => response,
  (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && originalRequest?.url === "/api/sign-in/") {
      logout();
      window.location.href = "/developer";
      return Promise.reject(error);
    }
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      axios.defaults.headers.common["Authorization"] = "";
      return axios
        .post(REFRESH_TOKEN, {
          refresh_token: refreshToken,
        })
        .then((res: any) => {
          setAccessToken(res?.data?.access_token);
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);
