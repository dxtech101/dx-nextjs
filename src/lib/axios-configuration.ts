
import axios from "axios";
// cookie helpers
import Cookies from "js-cookie";
import { getAuthenticationToken } from "./cookie";

axios.defaults.baseURL = "https://dx-digital-94bdac14721f.herokuapp.com/"
axios.defaults.maxRedirects = 0;
axios.defaults.timeout = 10000;

export const setAxiosHeader = (token: string) => {
  if (token) axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  else axios.defaults.headers.common["Authorization"] = "";
};

(function () {
  let authToken: any = getAuthenticationToken();
  authToken = authToken ? JSON.parse(authToken) : null;
  if (authToken && authToken.access_token) setAxiosHeader(authToken.access_token);
})();

const UNAUTHORIZED = [401];

// Add Axios request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userToken");
    const access_token = token ? JSON.parse(token)?.access_token : null;

    const excludedUrls = ["/users/enroll-user/"]; 
    
    if (!excludedUrls.some((url) => config.url?.includes(url)) && access_token) {
      axios.defaults.headers.common["Authorization"] = `JWT ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

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
