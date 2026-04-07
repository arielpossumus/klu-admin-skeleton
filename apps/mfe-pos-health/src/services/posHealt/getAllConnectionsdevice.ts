import { BASE_URL, POS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { DeviceConnection } from "@/types/device/DeviceConnection";

const ENDPOINT = `${BASE_URL}${POS_API}/getAllconectionsDevices.json`;

export type DeviceConnectionListResponse = {
    total: number;
    rows: DeviceConnection[];
};

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const numOpt = (raw: unknown): number | undefined => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
};

const normalizeConnection = (raw: unknown): DeviceConnection | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const posSerial = str(o.posSerial ?? o.serial);
    if (posSerial === "") return null;

    const connectionType = str(o.connectionType, "");
    const wifiName = str(o.wifiName, "");
    const gsmSIMState = str(o.gsmSIMState, "");
    const ethernet = str(o.ethernet, "");
    const networkInitialized = str(o.networkInitialized, "");
    const wifiSignal = numOpt(o.wifiSignal);
    const gsmMobileSignal = numOpt(o.gsmMobileSignal);

    return {
        posCorporation: str(o.posCorporation),
        posBusiness: str(o.posBusiness),
        posBranch: str(o.posBranch, "") || undefined,
        posSerial,
        posBrand: str(o.posBrand),
        posModel: str(o.posModel),
        ...(connectionType !== "" ? { connectionType } : {}),
        ...(wifiSignal !== undefined ? { wifiSignal } : {}),
        ...(wifiName !== "" ? { wifiName } : {}),
        ...(gsmMobileSignal !== undefined ? { gsmMobileSignal } : {}),
        ...(gsmSIMState !== "" ? { gsmSIMState } : {}),
        ...(ethernet !== "" ? { ethernet } : {}),
        ...(networkInitialized !== "" ? { networkInitialized } : {}),
    };
};

const normalize = (raw: unknown): DeviceConnectionListResponse => {
    if (raw == null || typeof raw !== "object") return { total: 0, rows: [] };
    const o = raw as Record<string, unknown>;
    const totalRaw = o.total;
    const total = typeof totalRaw === "number" && Number.isFinite(totalRaw) ? totalRaw : 0;
    const rowsRaw = o.rows;
    const rows = Array.isArray(rowsRaw)
        ? rowsRaw.map(normalizeConnection).filter((r): r is DeviceConnection => r != null)
        : [];
    return { total: total || rows.length, rows };
};

export const getAllConnectionsdevice = async (): Promise<DeviceConnectionListResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
