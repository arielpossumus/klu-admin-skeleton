import axios from "axios";
import { attachAuthInterceptors } from "@klu/auth-session";

const baseURL = import.meta.env.BASE_URL ?? "";

export const axiosClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

attachAuthInterceptors(axiosClient);
