import { useState } from "react";
import { DataTable } from "@/components/ui/data-table"; import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DEVICE_OPTIONS, type DeviceOption } from "@/config/options";
import { deviceColumns, type Device } from "../../components/tables/deviceColumns";
import { deviceBatteryColumns, type DeviceBattery } from "../../components/tables/deviceBatteryColumns";
import devicesJson from "../../../public/mockups/getAlldevices.json" with { type: "json" };
import devicesBatteryJson from "../../../public/mockups/getAllDevicesBatery.json" with { type: "json" };


const PosHealth = () => {

    const devicesData = devicesJson as { total: number; rows: Device[] };
    const devices: Device[] = devicesData.rows ?? [];

    const devicesBatteryData = devicesBatteryJson as { total: number; rows: DeviceBattery[] };
    const batteries: DeviceBattery[] = devicesBatteryData.rows ?? [];
    const [device, setDevice] = useState<DeviceOption>(DEVICE_OPTIONS[0]);
    // const [tableSelected, setTableSelected] = useState<string>("devices");
    console.log("device", device);

    return (
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-wrap items-center justify-end gap-3">
                <ButtonGroup>
                    {DEVICE_OPTIONS.map((opt) => (
                        <Button
                            key={opt}
                            variant={device === opt ? "default" : "outline"}
                            size="sm"
                            onClick={() => setDevice(opt)}
                        >
                            {opt}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            {device === "Dispositivo" && <DataTable columns={deviceColumns} data={devices} />}
            {device === "Bateria" && <DataTable columns={deviceBatteryColumns} data={batteries} />}
            {/* {device === "Impresora" && <DataTable columns={printerColumns} data={printers} />}
            {device === "Conexion" && <DataTable columns={connectionColumns} data={connections} />} */}
        </div>
    );
};

export default PosHealth;
