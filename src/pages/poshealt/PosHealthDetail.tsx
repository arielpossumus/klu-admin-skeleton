import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import devicesJson from "../../../public/mockups/getDeviceById.json" with { type: "json" };
import SectionTitle from "@/components/text/SectionTitle";
import { Smartphone, Battery, Printer, Wifi } from "lucide-react";
import { DeviceTab } from "@/components/tabsContent/device/DeviceTab";
import { BatteryDeviceTab } from "@/components/tabsContent/device/BatteryDeviceTab";
import { PrinterDeviceTab } from "@/components/tabsContent/device/PrinterDeviceTab";
import { ConnectionDeviceTab } from "@/components/tabsContent/device/ConnectionDeviceTab";
import type { DeviceByIdPayload } from "@/types/device/DeviceByIdPayload";

const PosHealthDetail = () => {
    const { serialId } = useParams<{ serialId: string; }>();
    const serialDevice = serialId ?? "";
    const deviceData = devicesJson as DeviceByIdPayload;
    const device = deviceData.dispositivo;
    const battery = deviceData.bateria as Record<string, unknown>;
    const printer = deviceData.impresora as Record<string, unknown>;
    const connection = deviceData.conexion as Record<string, unknown>;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="flex flex-1 flex-col">
            <SectionTitle title={`${device.posBrand} ${device.posModel}`} subtitle={`Serial: ${serialDevice}`} actionName="Editar Dispositivo" showButton={false} showBadge={false} />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Tabs defaultValue="dispositivo" className="w-full">
                    <TabsList className="inline-flex w-full justify-start rounded-xl bg-[var(--primary-foreground)] p-1.5">
                        <TabsTrigger
                            value="dispositivo"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Smartphone className="size-4" />
                            Dispositivo
                        </TabsTrigger>
                        <TabsTrigger
                            value="bateria"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Battery className="size-4" />
                            Batería
                        </TabsTrigger>
                        <TabsTrigger
                            value="impresora"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Printer className="size-4" />
                            Impresora
                        </TabsTrigger>
                        <TabsTrigger
                            value="conexion"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Wifi className="size-4" />
                            Conexión
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dispositivo" className="mt-6">
                        <DeviceTab device={device} isLoading={isLoading} />
                    </TabsContent>

                    <TabsContent value="bateria" className="mt-6">
                        <BatteryDeviceTab battery={battery} isLoading={isLoading} />
                    </TabsContent>

                    <TabsContent value="impresora" className="mt-6">
                        <PrinterDeviceTab printer={printer} isLoading={isLoading} />
                    </TabsContent>

                    <TabsContent value="conexion" className="mt-6">
                        <ConnectionDeviceTab connection={connection} isLoading={isLoading} />
                    </TabsContent>
                </Tabs>
            </div >
        </div>
    );
};

export default PosHealthDetail;
