import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import devicesJson from "../../../public/mockups/getDeviceById.json" with { type: "json" };
import ParagraphH3 from "@/components/text/ParagraphH3";
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
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <ParagraphH3 text={` ${device.posBrand} ${device.posModel} - Serial:${serialDevice}`} />
            <Tabs defaultValue="dispositivo" className="w-full">
                <TabsList
                    variant="line"
                    className="h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0"
                >
                    <TabsTrigger
                        value="dispositivo"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide cursor-pointer data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm data-[state=active]:after:bg-primary"
                    >
                        <Smartphone className="size-4" />
                        DISPOSITIVO
                    </TabsTrigger>
                    <TabsTrigger
                        value="bateria"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide cursor-pointer data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm data-[state=active]:after:bg-primary"
                    >
                        <Battery className="size-4" />
                        BATERÍA
                    </TabsTrigger>
                    <TabsTrigger
                        value="impresora"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide cursor-pointer data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm data-[state=active]:after:bg-primary"
                    >
                        <Printer className="size-4" />
                        IMPRESORA
                    </TabsTrigger>
                    <TabsTrigger
                        value="conexion"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide cursor-pointer data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm data-[state=active]:after:bg-primary"
                    >
                        <Wifi className="size-4" />
                        CONEXIÓN
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
    );
};

export default PosHealthDetail;
