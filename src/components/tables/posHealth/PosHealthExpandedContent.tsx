import type { Device } from "@/types/device/Device";
import type { DeviceBattery } from "@/types/device/DeviceBattery";
import type { DevicePrinter } from "@/types/device/DevicePrinter";
import type { DeviceConnection } from "@/types/device/DeviceConnection";
import type { PosHealthExpandedType } from "./posHealthTypes";
import { DeviceDetailSection } from "./DeviceDetailSection";
import { BatteryDetailSection } from "./BatteryDetailSection";
import { PrinterDetailSection } from "./PrinterDetailSection";
import { ConnectionDetailSection } from "./ConnectionDetailSection";

export interface PosHealthExpandedContentProps {
    row: Device;
    expandedType: PosHealthExpandedType;
    devices: Device[];
    batteries: DeviceBattery[];
    printers: DevicePrinter[];
    connections: DeviceConnection[];
}

export const PosHealthExpandedContent = ({
    row,
    expandedType,
    devices,
    batteries,
    printers,
    connections,
}: PosHealthExpandedContentProps) => {
    const serial = row.posSerial;
    if (!expandedType) return null;

    if (expandedType === "device") {
        const device = devices.find((d) => d.posSerial === serial) ?? row;
        return <DeviceDetailSection device={device} />;
    }

    if (expandedType === "battery") {
        const battery = batteries.find((b) => b.posSerial === serial);
        if (!battery) return <p className="text-sm text-muted-foreground">Sin datos de batería para este serial.</p>;
        return <BatteryDetailSection battery={battery} />;
    }

    if (expandedType === "printer") {
        const printer = printers.find((p) => p.posSerial === serial);
        if (!printer) return <p className="text-sm text-muted-foreground">Sin datos de impresora para este serial.</p>;
        return <PrinterDetailSection printer={printer} />;
    }

    if (expandedType === "connection") {
        const connection = connections.find((c) => c.posSerial === serial);
        if (!connection) return <p className="text-sm text-muted-foreground">Sin datos de conexión para este serial.</p>;
        return <ConnectionDetailSection connection={connection} />;
    }

    return null;
};
