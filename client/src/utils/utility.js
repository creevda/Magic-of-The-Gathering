/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable linebreak-style */
import Cookies from "js-cookie";
import { COOKIES } from "../constants/index";

export const getAuthCookies = () => {
  return {
    accessToken: Cookies.get(COOKIES.accessToken) || "",
    refreshToken: Cookies.get(COOKIES.refreshToken) || "",
  };
};