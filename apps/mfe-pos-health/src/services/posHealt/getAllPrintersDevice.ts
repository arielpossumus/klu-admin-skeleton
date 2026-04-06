import { BASE_URL, POS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { DevicePrinter } from "@/types/device/DevicePrinter";

const ENDPOINT = `${BASE_URL}${POS_API}/getAllPrinterDevices.json`;

export type DevicePrinterListResponse = {
    total: number;
    rows: DevicePrinter[];
};

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalizePrinter = (raw: unknown): DevicePrinter | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const posSerial = str(o.posSerial ?? o.serial);
    if (posSerial === "") return null;
    const printerAvailable = str(o.printerAvailable, "");
    const printerState = str(o.printerState, "");
    return {
        posCorporation: str(o.posCorporation),
        posBusiness: str(o.posBusiness),
        posBranch: str(o.posBranch, "") || undefined,
        posSerial,
        posBrand: str(o.posBrand),
        posModel: str(o.posModel),
        ...(printerAvailable !== "" ? { printerAvailable } : {}),
        ...(printerState !== "" ? { printerState } : {}),
    };
};

const normalize = (raw: unknown): DevicePrinterListResponse => {
    if (raw == null || typeof raw !== "object") return { total: 0, rows: [] };
    const o = raw as Record<string, unknown>;
    const totalRaw = o.total;
    const total = typeof totalRaw === "number" && Number.isFinite(totalRaw) ? totalRaw : 0;
    const rowsRaw = o.rows;
    const rows = Array.isArray(rowsRaw)
        ? rowsRaw.map(normalizePrinter).filter((r): r is DevicePrinter => r != null)
        : [];
    return { total: total || rows.length, rows };
};

export const getAllPrintersDevice = async (): Promise<DevicePrinterListResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
