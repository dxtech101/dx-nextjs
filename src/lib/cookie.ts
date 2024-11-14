// next imports
import Router from "next/navigation";
// next-cookie
import nextCookie from "next-cookies";
// js cookie
import cookie from "js-cookie";
// axios
import { setAxiosHeader } from "./axios-configuration";

// optimizing the user token data
const optimizeUserToken = (userToken: any) => {
  let token = JSON.parse(JSON.stringify(userToken));
  token = { ...token, user: { ...token?.user, initial_assessments: [] } };
  return token;
};

// getting server side cookies
export const getServerAuthenticationCookie = (context: any) => {
  const { userToken } = nextCookie(context);
  if (userToken) return userToken;
  else return;
};

// setting authentication tokens
export const setAuthenticationToken = (userToken: any) => {
  if (userToken) {
    let stringifyUserToken = userToken ? optimizeUserToken(userToken) : null;
    console.log("stringifyUserToken",stringifyUserToken);
    stringifyUserToken = stringifyUserToken != null ? JSON.stringify(stringifyUserToken) : "";
    cookie.set("userToken", stringifyUserToken);
    setAxiosHeader(userToken.access_token);
  }
};

export const getAuthenticationToken = () => {
  const userToken = cookie.get("userToken") ? cookie.get("userToken") : null;
  return userToken;
};

export const removeAuthenticationToken = () => {
  cookie.remove("userToken");
};

// removing all user tokens
export const logout = () => {
  removeAuthenticationToken();
  // Router.push("/signin");
};

export const getRefreshToken = () => {
  const userToken: any = cookie.get("userToken") ? cookie.get("userToken") : null;
  return JSON.parse(userToken)?.refresh_token;
};

export const setAccessToken = (access_token: any) => {
  let userToken: any = cookie.get("userToken") ? cookie.get("userToken") : null;
  userToken = JSON.parse(userToken);
  userToken["access_token"] = access_token;
  setAuthenticationToken(userToken);
};
