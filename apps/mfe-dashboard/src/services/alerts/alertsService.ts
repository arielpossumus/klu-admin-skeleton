import { BASE_URL, DASHBOARD_API, ALERTS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { DashboardAlert, DashboardAlertType } from "@/types/dashboard/DashboardAlert";

const ENDPOINT = `${BASE_URL}${DASHBOARD_API}${ALERTS_API}getAlerts.json`;

const ALERT_TYPES: readonly DashboardAlertType[] = ["warning", "info", "error"];

const isAlertType = (raw: unknown): raw is DashboardAlertType =>
    typeof raw === "string" && (ALERT_TYPES as readonly string[]).includes(raw);

const numId = (raw: unknown): number => {
    const n = typeof raw === "number" ? raw : Number(raw);
    return Number.isFinite(n) ? n : 0;
};

const str = (raw: unknown): string => (typeof raw === "string" ? raw.trim() : "");

const normalizeItem = (raw: unknown, index: number): DashboardAlert | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const title = str(o.title);
    const description = str(o.description);
    if (title === "" && description === "") return null;
    const type: DashboardAlertType = isAlertType(o.type) ? o.type : "info";
    return {
        id: numId(o.id) || index + 1,
        title: title || "Alerta",
        description: description || "—",
        type,
    };
};

export const getAlerts = async (): Promise<DashboardAlert[]> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    if (!Array.isArray(data)) return [];
    return data
        .map((item, index) => normalizeItem(item, index))
        .filter((a): a is DashboardAlert => a != null);
};
