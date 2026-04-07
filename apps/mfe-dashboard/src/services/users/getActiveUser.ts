import { BASE_URL, USERS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { ActiveUser } from "@/types/user/ActiveUser";

const ENDPOINT = `${BASE_URL}${USERS_API}getUser.json`;

const emptyUser = (): ActiveUser => ({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "",
    createdAt: "",
    updatedAt: "",
});

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalize = (raw: unknown): ActiveUser => {
    if (raw == null || typeof raw !== "object") return emptyUser();
    const o = raw as Record<string, unknown>;
    return {
        userName: str(o.userName),
        firstName: str(o.FirstName ?? o.firstName),
        lastName: str(o.LastName ?? o.lastName),
        email: str(o.Email ?? o.email),
        role: str(o.Role ?? o.role),
        status: str(o.Status ?? o.status),
        createdAt: str(o.CreatedAt ?? o.createdAt),
        updatedAt: str(o.UpdatedAt ?? o.updatedAt),
    };
};

export const getActiveUser = async (): Promise<ActiveUser> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
