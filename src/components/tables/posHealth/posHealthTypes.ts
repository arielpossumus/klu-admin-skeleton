import type { DeviceBattery } from "@/types/device/DeviceBattery";
import type { DevicePrinter } from "@/types/device/DevicePrinter";
import type { DeviceConnection } from "@/types/device/DeviceConnection";

export type PosHealthExpandedType = "device" | "battery" | "printer" | "connection" | null;

export interface PosHealthColumnsParams {
    expandedRowId: string | null;
    expandedType: PosHealthExpandedType;
    batteries: DeviceBattery[];
    printers: DevicePrinter[];
    connections: DeviceConnection[];
    onActionClick: (serial: string, type: PosHealthExpandedType) => void;
}
