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

// Authorization: Bearer <access_token> en cada request (token de sesión post-login).
attachAuthInterceptors(axiosClient);
