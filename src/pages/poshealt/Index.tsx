import { useState, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import SectionTitle from "@/components/text/SectionTitle";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DEVICE_OPTIONS, type DeviceOption } from "@/config/options";
import { deviceColumns } from "@/components/tables/deviceColumns";
import { deviceBatteryColumns } from "@/components/tables/deviceBatteryColumns";
import { devicePrinterColumns } from "@/components/tables/devicePrinterColumns";
import { deviceConnectionColumns } from "@/components/tables/deviceconectionsColumns";
import type { Device } from "@/types/device/Device";
import type { DeviceBattery } from "@/types/device/DeviceBattery";
import type { DevicePrinter } from "@/types/device/DevicePrinter";
import type { DeviceConnection } from "@/types/device/DeviceConnection";
import devicesJson from "../../../public/mockups/getAlldevices.json" with { type: "json" };
import devicesBatteryJson from "../../../public/mockups/getAllDevicesBatery.json" with { type: "json" };
import devicesPrinterJson from "../../../public/mockups/getAllPrinterDevices.json" with { type: "json" };
import devicesConnectionJson from "../../../public/mockups/getAllconectionsDevices.json" with { type: "json" };
import { TablesLoader } from "@/components/loaders/TablesLoader";
import { Card } from "@/components/ui/card";

const PosHealth = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    const devicesData = devicesJson as { total: number; rows: Device[]; };
    const devices: Device[] = devicesData.rows ?? [];

    const devicesBatteryData = devicesBatteryJson as { total: number; rows: DeviceBattery[]; };
    const batteries: DeviceBattery[] = devicesBatteryData.rows ?? [];

    const devicesPrinterData = devicesPrinterJson as { total: number; rows: DevicePrinter[]; };
    const printers: DevicePrinter[] = devicesPrinterData.rows ?? [];

    const devicesConnectionData = devicesConnectionJson as { total: number; rows: DeviceConnection[]; };
    const connections: DeviceConnection[] = devicesConnectionData.rows ?? [];

    const [device, setDevice] = useState<DeviceOption>(DEVICE_OPTIONS[0]);

    let tableConfig: { columns: ColumnDef<unknown, unknown>[]; data: unknown[]; };
    switch (device) {
        case "Dispositivo":
            tableConfig = { columns: deviceColumns as ColumnDef<unknown, unknown>[], data: devices };
            break;
        case "Bateria":
            tableConfig = { columns: deviceBatteryColumns as ColumnDef<unknown, unknown>[], data: batteries };
            break;
        case "Impresora":
            tableConfig = { columns: devicePrinterColumns as ColumnDef<unknown, unknown>[], data: printers };
            break;
        case "Conexion":
        default:
            tableConfig = { columns: deviceConnectionColumns as ColumnDef<unknown, unknown>[], data: connections };
            break;
    }

    return (
        <>
            <SectionTitle title="POS Health" subtitle="Dispositivos y estado de los mismos" />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Card className="p-4">
                    <div className="flex flex-wrap items-center justify-end gap-3">
                        <ButtonGroup>
                            {DEVICE_OPTIONS.map((opt) => (
                                <Button
                                    key={opt}
                                    variant={device === opt ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setDevice(opt)}
                                    className={device === opt ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]" : "bg-[var(--background)] text-foreground hover:bg-[var(--accent)] hover:text-accent-foreground"}
                                >
                                    {opt}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                    {isLoading ? <TablesLoader columnCount={10} rowCount={10} loadingText="Cargando datos de dispositivos POS" /> : <DataTable columns={tableConfig.columns} data={tableConfig.data} />}
                </Card>
            </div>
        </>
    );
};

export default PosHealth;
