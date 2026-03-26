import axios from "axios";

const baseURL = import.meta.env.BASE_URL ?? "";

export const axiosClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});
