import { AUTH_TOKEN } from "./constant";

export const getToken = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    return localStorage.getItem(AUTH_TOKEN);
  }
};

export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
