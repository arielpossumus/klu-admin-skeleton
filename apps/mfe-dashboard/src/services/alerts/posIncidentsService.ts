import { BASE_URL, DASHBOARD_API, DASHBOARD_POS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { IncidentsResponse } from "@/types/dashboard/IncidentsResponse";

const ENDPOINT = `${BASE_URL}${DASHBOARD_API}${DASHBOARD_POS_API}getAllPosIncidents.json`;

const numField = (raw: unknown): number | undefined => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
};

const normalize = (raw: unknown): IncidentsResponse => {
    if (raw == null || typeof raw !== "object") return {};
    const o = raw as Record<string, unknown>;
    return {
        batteryIncidentsPercentage: numField(o.batteryIncidentsPercentage),
        printerIncidentsPercentage: numField(o.printerIncidentsPercentage),
        connectionIncidentsPercentage: numField(o.connectionIncidentsPercentage),
    };
};

export const getAllPosIncidents = async (): Promise<IncidentsResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
