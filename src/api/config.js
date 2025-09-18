import axios from "axios";
import { getCookie, setCookie } from "../constants/globalConstants";
import jwt_decode from "jwt-decode";
import { getApiServices } from "./api";
import { refreshToken } from "./apiPaths";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../routes/routePaths";
import store from "../redux/store";
import { setIsLoading } from "../redux/slice";

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE,
  // baseURL: "http://192.168.1.36:4000"
});

appApi.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = `Bearer ${
      config.url === refreshToken
        ? getCookie("refreshToken")
        : getCookie("token")
    }`;
    store.dispatch(setIsLoading(true));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appApi.interceptors.response.use(
  (response) => {
    store.dispatch(setIsLoading(false));
    return response;
  },
  async (error) => {
    const decodedTokenData = getCookie("token")
      ? jwt_decode(getCookie("token"))
      : "";
    const originalRequest = error.config;
    let retry = false;
    if (
      decodedTokenData.exp < Math.floor(new Date().getTime() / 1000) &&
      !retry &&
      error.response.status === 401
    ) {
      try {
        originalRequest.headers["authorization"] = `Bearer ${getCookie(
          "refreshToken"
        )}`;
        const { data } = await getApiServices(refreshToken);
        retry = true;
        originalRequest.headers[
          "authorization"
        ] = `Bearer ${data?.tokens?.token}`;
        setCookie("token", data?.token);
        setCookie("refreshToken", data?.refreshToken);
      } catch (err) {
        <Navigate to={LOGIN} />;
        store.dispatch(setIsLoading(false));
        retry = true;
      }

      return appApi(originalRequest);
    }
    store.dispatch(setIsLoading(false));
    return Promise.reject(error);
  }
);
