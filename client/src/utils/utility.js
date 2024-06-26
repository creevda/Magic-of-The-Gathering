import Cookies from "js-cookie";
import { COOKIES } from "../constants/index.js";

export const getAuthCookies = () => {
  return {
    accessToken: Cookies.get(COOKIES.accessToken) || "",
    refreshToken: Cookies.get(COOKIES.refreshToken) || "",
  };
};