import { BASE_URL, POS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { Device } from "@/types/device/Device";

const ENDPOINT = `${BASE_URL}${POS_API}/getAlldevices.json`;

export type DevicesListResponse = {
    total: number;
    rows: Device[];
};

const num = (raw: unknown, fallback = 0): number => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : fallback;
    }
    return fallback;
};

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalizeDevice = (raw: unknown): Device | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const posSerial = str(o.posSerial);
    if (posSerial === "") return null;
    return {
        posId: num(o.posId, 0),
        posCorporation: str(o.posCorporation),
        posBusiness: str(o.posBusiness),
        posBranch: str(o.posBranch, "") || undefined,
        posSerial,
        posBrand: str(o.posBrand),
        posModel: str(o.posModel),
        usedFlash: num(o.usedFlash, 0),
        usedRam: num(o.usedRam, 0),
        certificateType: str(o.certificateType),
        tamperStatus: str(o.tamperStatus),
    };
};

const normalize = (raw: unknown): DevicesListResponse => {
    if (raw == null || typeof raw !== "object") return { total: 0, rows: [] };
    const o = raw as Record<string, unknown>;
    const totalRaw = o.total;
    const total = typeof totalRaw === "number" && Number.isFinite(totalRaw) ? totalRaw : 0;
    const rowsRaw = o.rows;
    const rows = Array.isArray(rowsRaw)
        ? rowsRaw.map(normalizeDevice).filter((r): r is Device => r != null)
        : [];
    return { total: total || rows.length, rows };
};

export const getAllDevices = async (): Promise<DevicesListResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
