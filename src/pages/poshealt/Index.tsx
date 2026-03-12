import { useState, useEffect } from "react";
import SectionTitle from "@/components/text/SectionTitle";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import {
    getPosHealthColumns,
    PosHealthExpandedContent,
    type PosHealthExpandedType,
} from "@/components/tables/posHealth";
import type { Device } from "@/types/device/Device";
import type { DeviceBattery } from "@/types/device/DeviceBattery";
import type { DevicePrinter } from "@/types/device/DevicePrinter";
import type { DeviceConnection } from "@/types/device/DeviceConnection";
import devicesJson from "../../../public/mockups/getAlldevices.json" with { type: "json" };
import devicesBatteryJson from "../../../public/mockups/getAllDevicesBatery.json" with { type: "json" };
import devicesPrinterJson from "../../../public/mockups/getAllPrinterDevices.json" with { type: "json" };
import devicesConnectionJson from "../../../public/mockups/getAllconectionsDevices.json" with { type: "json" };
import { TablesLoader } from "@/components/loaders/TablesLoader";

const PosHealth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
    const [expandedType, setExpandedType] = useState<PosHealthExpandedType>(null);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(t);
    }, []);

    const devicesData = devicesJson as { total: number; rows: Device[] };
    const devices: Device[] = devicesData.rows ?? [];

    const devicesBatteryData = devicesBatteryJson as { total: number; rows: DeviceBattery[] };
    const batteries: DeviceBattery[] = devicesBatteryData.rows ?? [];

    const devicesPrinterData = devicesPrinterJson as { total: number; rows: DevicePrinter[] };
    const printers: DevicePrinter[] = devicesPrinterData.rows ?? [];

    const devicesConnectionData = devicesConnectionJson as { total: number; rows: DeviceConnection[] };
    const connections: DeviceConnection[] = devicesConnectionData.rows ?? [];

    const handleActionClick = (serial: string, type: PosHealthExpandedType) => {
        if (!type) return;
        const isSame = expandedRowId === serial && expandedType === type;
        setExpandedRowId(isSame ? null : serial);
        setExpandedType(isSame ? null : type);
    };

    const mainColumns = getPosHealthColumns({
        expandedRowId,
        expandedType,
        batteries,
        printers,
        connections,
        onActionClick: handleActionClick,
    });

    return (
        <>
            <SectionTitle title="POS Health" subtitle="Dispositivos y estado de los mismos" />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Card className="p-4">
                    {isLoading ? (
                        <TablesLoader columnCount={7} rowCount={10} loadingText="Cargando datos de dispositivos POS" />
                    ) : (
                        <DataTable<Device, unknown>
                            columns={mainColumns}
                            data={devices}
                            getRowId={(row) => row.posSerial}
                            expandedRowId={expandedRowId}
                            renderExpandedContent={(row) => (
                                <PosHealthExpandedContent
                                    row={row}
                                    expandedType={expandedType}
                                    devices={devices}
                                    batteries={batteries}
                                    printers={printers}
                                    connections={connections}
                                />
                            )}
                        />
                    )}
                </Card>
            </div>
        </>
    );
};

export default PosHealth;
