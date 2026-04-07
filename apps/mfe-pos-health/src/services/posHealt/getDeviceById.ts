import { BASE_URL, POS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { DeviceByIdPayload } from "@/types/device/DeviceByIdPayload";

const ENDPOINT = `${BASE_URL}${POS_API}/getDeviceById.json`;

const asRecord = (raw: unknown): Record<string, unknown> =>
    raw !== null && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};

const normalize = (raw: unknown): DeviceByIdPayload => {
    if (raw == null || typeof raw !== "object") {
        return { dispositivo: {}, bateria: {}, impresora: {}, conexion: {} };
    }
    const o = raw as Record<string, unknown>;
    return {
        dispositivo: asRecord(o.dispositivo) as DeviceByIdPayload["dispositivo"],
        bateria: asRecord(o.bateria),
        impresora: asRecord(o.impresora),
        conexion: asRecord(o.conexion),
    };
};

/**
 * Detalle de dispositivo (mock estático en host: `pos/getDeviceById.json`).
 * `serialId` se envía como query por si el backend lo usa más adelante.
 */
export const getDeviceById = async (serialId: string): Promise<DeviceByIdPayload> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT, {
        params: serialId.trim() !== "" ? { serial: serialId } : undefined,
    });
    return normalize(data);
};
