import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import devicesJson from "../../../public/mockups/getDeviceById.json" with { type: "json" };
import ParagraphH3 from "@/components/text/ParagraphH3";
import { ChargeLevelRadial } from "@/components/charts/ChargeLevelRadial";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailRow from "@/components/text/detailRow";
import { UsageRadial } from "@/components/charts/UsageRadial";
import { Smartphone, Battery, Printer, Wifi } from "lucide-react";
import DetailRowYesNo from "@/components/text/detailRowYesNo";
import WifiSignalIndicator from "@/components/charts/WifiSignalIndicator";
import EmptyCardLoader from "@/components/loaders/EmptyCardLoader";

interface DeviceByIdPayload {
    dispositivo: {
        totalRAM?: number;
        totalFlash?: number;
        usedRam?: number;
        usedFlash?: number;
        certificateType?: string;
        tamperStatus?: string;
        posBrand?: string;
        posModel?: string;
        posSerial?: string;
        operativeSystem?: string;
        owner?: string;
        sdkVersion?: string;
        msrReadCount?: number;
        msrTrack1ErrorCounter?: number;
        msrTrack2ErrorCounter?: number;
        msrTrack3ErrorCounter?: number;
        chipReadCount?: number;
        chipReadError?: number;
    };
    bateria: Record<string, unknown>;
    impresora: Record<string, unknown>;
    conexion: Record<string, unknown>;
}

import { formatKBtoMB } from "@/lib/format";


const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return "";
    if (typeof value === "boolean") return value ? "Sí" : "No";
    return String(value);
};

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
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide data-[state=active]:bg-background data-[state=active]:text-violet-600 data-[state=active]:shadow-sm after:hidden"
                    >
                        <Smartphone className="size-4" />
                        DISPOSITIVO
                    </TabsTrigger>
                    <TabsTrigger
                        value="bateria"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide data-[state=active]:bg-background data-[state=active]:text-violet-600 data-[state=active]:shadow-sm after:hidden"
                    >
                        <Battery className="size-4" />
                        BATERÍA
                    </TabsTrigger>
                    <TabsTrigger
                        value="impresora"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide data-[state=active]:bg-background data-[state=active]:text-violet-600 data-[state=active]:shadow-sm after:hidden"
                    >
                        <Printer className="size-4" />
                        IMPRESORA
                    </TabsTrigger>
                    <TabsTrigger
                        value="conexion"
                        className="gap-2 flex-none px-3 py-2 text-xs font-semibold uppercase tracking-wide data-[state=active]:bg-background data-[state=active]:text-violet-600 data-[state=active]:shadow-sm after:hidden"
                    >
                        <Wifi className="size-4" />
                        CONEXIÓN
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dispositivo" className="mt-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[30%_1fr] mt-4 items-start">
                        <Card className="border-border/60">
                            {isLoading ?
                                <EmptyCardLoader title="Cargando datos de almacenamiento" description="Por favor espere mientras cargamos los datos del dispositivo. No actualice la página." />
                                : (
                                    <>

                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                                Almacenamiento
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-0 place-items-center">
                                            <UsageRadial
                                                total={Number(device.totalRAM) || 1}
                                                used={Number(device.usedRam) || 0}
                                                label="RAM"
                                                displayTotal={formatKBtoMB(device.totalRAM)}
                                                displayUsed={formatKBtoMB(device.usedRam)}
                                            />
                                            <UsageRadial
                                                total={Number(device.totalFlash) || 1}
                                                used={Number(device.usedFlash) || 0}
                                                label="FLASH"
                                                displayTotal={formatKBtoMB(device.totalFlash)}
                                                displayUsed={formatKBtoMB(device.usedFlash)}
                                            />
                                        </CardContent>

                                    </>)}
                        </Card>
                        <div className="flex flex-col gap-4 items-start">
                            <Card className="border-border/60 w-full">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                        Detalles
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                                        <DetailRow label="Propietario" value={device.owner} />
                                        <DetailRow label="Certificado" value={device.certificateType} />
                                        <DetailRow label="Estado de Daño" value={device.tamperStatus} />
                                        <DetailRow label="Sistema Operativo" value={device.operativeSystem} />
                                        <DetailRow label="Versión SDK" value={device.sdkVersion} />
                                        <DetailRow label="Lecturas por Banda Magnética" value={device.msrReadCount} />
                                        <DetailRow label="Lecturas por Chip" value={device.chipReadCount} />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-border/60 w-full">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                        Errores
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                                        <DetailRow label="Track 1" value={device.msrTrack1ErrorCounter} />
                                        <DetailRow label="Track 2" value={device.msrTrack2ErrorCounter} />
                                        <DetailRow label="Track 3" value={device.msrTrack3ErrorCounter} />
                                        <DetailRow label="Chip" value={device.chipReadError} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="bateria" className="mt-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[30%_1fr] mt-4 items-start">
                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    Batería
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center pt-0">
                                <ChargeLevelRadial value={Number(battery.chargeLevel ?? 0)} />
                                <div className="grid w-fit grid-cols-2 gap-x-6 gap-y-2 mt-2">
                                    <DetailRowYesNo label="Cargando" value={battery.charging} />
                                    <DetailRowYesNo label="Conectada" value={battery.connected} />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    Detalles
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                                    <DetailRow label="Batería Disponible" value={battery.batteryAvailable} />
                                    <DetailRow label="Estado" value={battery.batteryStatus} />
                                    <DetailRow label="Tiene Batería" value={battery.hasBattery} />
                                    <DetailRow label="Voltaje" value={battery.voltage} />
                                    <DetailRow label="Capacidad" value={battery.capacity} />
                                    <DetailRow label="Estado de Batería Interna" value={battery.internalBatteryStatus} />
                                    <DetailRow label="Voltaje de Batería Interna" value={battery.internalBatteryVoltage} />
                                    <DetailRow label="Temperatura" value={battery.temperature} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="impresora" className="mt-6">
                    <Card className="border-border/60 mt-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                Detalles
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                                <DetailRow label="Impresora Disponible" value={printer.printerAvailable} />
                                <DetailRow label="Estado" value={printer.printerState} />
                                <DetailRow label="Temperatura" value={printer.temperature} />
                                <DetailRow label="Voltaje Cabezal" value={printer.headVoltage} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="conexion" className="mt-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4 items-start">
                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    WiFi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center pt-0">
                                <WifiSignalIndicator value={Number(connection.wifiSignal ?? 0)} networkName={formatValue(connection.wifiName)} label="WiFi" />
                            </CardContent>
                        </Card>
                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    GSM
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center pt-0">
                                <WifiSignalIndicator value={Number(connection.gsmMobileSignal ?? 0)} networkName={formatValue(connection.mobileOperatorName)} label="GSM" />
                            </CardContent>
                        </Card>
                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    Detalles
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                                    <DetailRow label="Red Iniciada" value={connection.networkInitialized} />
                                    <DetailRow label="SIM Presente" value={connection.gsmSIMPresent} />
                                    <DetailRow label="Estado de SIM" value={connection.gsmSIMState} />
                                    <DetailRow label="Ethernet" value={connection.ethernet} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
};

export default PosHealthDetail;
