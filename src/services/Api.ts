import axios from "axios";

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const linstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default instance;
