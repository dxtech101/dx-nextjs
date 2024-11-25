
import axios from "axios";
// constants
import { BASE_STAGING, BASE_LOCAL, BASE_PROD } from "@/constants/api-routes";
// cookie helpers
import { logout, getAuthenticationToken, getRefreshToken, setAccessToken } from "./cookie";

axios.defaults.baseURL = "https://dx-digital-94bdac14721f.herokuapp.com/"
// axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, PATCH, OPTIONS";
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "X-Requested-With, content-type, Authorization";
axios.defaults.maxRedirects = 0;
axios.defaults.timeout = 10000;

export const setAxiosHeader = (token: string) => {
  if (token) axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  else axios.defaults.headers.common["Authorization"] = "";
};

// (function () {
//   let authToken: any = getAuthenticationToken();
//   authToken = authToken ? JSON.parse(authToken) : null;
//   if (authToken && authToken.access_token) setAxiosHeader(authToken.access_token);
// })();

const UNAUTHORIZED = [401];
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;
//     if (error?.response?.status === 401 && originalRequest?.url === "/api/sign-in/") {
//       logout();
//       window.location.href = "/signin";
//       return Promise.reject(error);
//     }
//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = getRefreshToken();
//       axios.defaults.headers.common["Authorization"] = "";
//       return axios
//         .post(REFRESH_TOKEN, {
//           refresh_token: refreshToken,
//         })
//         .then((res: any) => {
//           setAccessToken(res?.data?.access_token);
//           return axios(originalRequest);
//         });
//     }
//     return Promise.reject(error);
//   }
// );
