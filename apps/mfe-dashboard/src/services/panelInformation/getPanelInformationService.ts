import { ACCEPTANCE_API, BASE_URL, DASHBOARD_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { PanelInfoResponse } from "@/types/dashboard/PanelInfoResponse";

const ENDPOINT = `${BASE_URL}${DASHBOARD_API}${ACCEPTANCE_API}getPanelInformation.json`;

const numField = (raw: unknown): number | undefined => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
};

const normalize = (raw: unknown): PanelInfoResponse => {
    if (raw == null || typeof raw !== "object") return {};
    const o = raw as Record<string, unknown>;
    return {
        visaAcceptance: numField(o.visaAcceptance),
        mastercardAcceptance: numField(o.mastercardAcceptance),
        carnetAcceptance: numField(o.carnetAcceptance),
        amexAcceptance: numField(o.amexAcceptance),
        otherBrandsAcceptance: numField(o.otherBrandsAcceptance),
    };
};

export const getPanelInformation = async (): Promise<PanelInfoResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
