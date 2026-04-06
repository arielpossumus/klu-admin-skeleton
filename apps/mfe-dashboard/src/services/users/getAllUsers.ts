import { BASE_URL, USERS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { UserListItem } from "@/types/user/UserListItem";

const ENDPOINT = `${BASE_URL}${USERS_API}getAllUsers.json`;

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalizeRow = (raw: unknown): UserListItem | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const id = str(o.userId);
    if (id === "") return null;
    return {
        id,
        name: str(o.userName),
        email: str(o.userEmail),
        status: str(o.userStatus),
        profile: str(o.userProfile),
        level: str(o.userLevel),
    };
};

export type AllUsersResult = {
    total: number;
    users: UserListItem[];
};

const emptyResult = (): AllUsersResult => ({ total: 0, users: [] });

const normalizeResponse = (raw: unknown): AllUsersResult => {
    if (raw == null || typeof raw !== "object") return emptyResult();
    const o = raw as Record<string, unknown>;
    const total = typeof o.total === "number" && Number.isFinite(o.total) ? o.total : 0;
    const rows = Array.isArray(o.rows) ? o.rows : [];
    const users = rows.map(normalizeRow).filter((u): u is UserListItem => u != null);
    return { total: total || users.length, users };
};

/**
 * Listado completo desde mock/API.
 * Para “últimos creados”: el mock no trae fecha; se ordena por `userId` numérico descendente como aproximación.
 */
export const getAllUsers = async (): Promise<AllUsersResult> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalizeResponse(data);
};

const numericId = (id: string): number => {
    const n = Number.parseInt(id, 10);
    return Number.isFinite(n) ? n : 0;
};

export const getRecentUsersCreated = async (limit = 5): Promise<UserListItem[]> => {
    const { users } = await getAllUsers();
    const sorted = [...users].sort((a, b) => numericId(b.id) - numericId(a.id));
    return sorted.slice(0, Math.max(0, limit));
};
