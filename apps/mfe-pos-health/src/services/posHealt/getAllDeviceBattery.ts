import { BASE_URL, POS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { DeviceBattery } from "@/types/device/DeviceBattery";

const ENDPOINT = `${BASE_URL}${POS_API}/getAllDevicesBatery.json`;

export type DeviceBatteryListResponse = {
    total: number;
    rows: DeviceBattery[];
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

const normalizeBattery = (raw: unknown): DeviceBattery | null => {
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
        batteryAvailable: str(o.batteryAvailable),
        chargeLevel: num(o.chargeLevel, 0),
        charging: str(o.charging),
        connected: str(o.connected),
    };
};

const normalize = (raw: unknown): DeviceBatteryListResponse => {
    if (raw == null || typeof raw !== "object") return { total: 0, rows: [] };
    const o = raw as Record<string, unknown>;
    const totalRaw = o.total;
    const total = typeof totalRaw === "number" && Number.isFinite(totalRaw) ? totalRaw : 0;
    const rowsRaw = o.rows;
    const rows = Array.isArray(rowsRaw)
        ? rowsRaw.map(normalizeBattery).filter((r): r is DeviceBattery => r != null)
        : [];
    return { total: total || rows.length, rows };
};

export const getAllDeviceBattery = async (): Promise<DeviceBatteryListResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
