import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from "@/components/text/SectionTitle";
import DetailRow from "@/components/text/detailRow";
import DetailRowYesNo from "@/components/text/detailRowYesNo";
import { UsageRadial } from "@/components/charts/UsageRadial";
import { ChargeLevelRadial } from "@/components/charts/ChargeLevelRadial";
import WifiSignalIndicator from "@/components/charts/WifiSignalIndicator";
import EmptyCardLoader from "@/components/loaders/EmptyCardLoader";
import { formatKBtoMB } from "@/lib/format";
import { Monitor, ScreenShareOff, Globe, GlobeLock, Smartphone, Battery, Printer, Wifi } from "lucide-react";
import devicesJson from "../../../public/mockups/getDeviceById.json" with { type: "json" };
import type { DeviceByIdPayload } from "@/types/device/DeviceByIdPayload";

const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return "—";
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
        const t = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(t);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-1 flex-col">
                <SectionTitle
                    title={`${device.posBrand ?? ""} ${device.posModel ?? ""}`}
                    subtitle={`Serial: ${serialDevice}`}
                    actionName="Editar Dispositivo"
                    showButton={false}
                    showBadge={false}
                />
                <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <EmptyCardLoader
                        title="Cargando datos del dispositivo"
                        description="Por favor espere mientras cargamos los datos. No actualice la página."
                        okIcon={false}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <SectionTitle
                title={`${device.posBrand ?? ""} ${device.posModel ?? ""}`}
                subtitle={`Serial: ${serialDevice}`}
                actionName="Editar Dispositivo"
                showButton={false}
                showBadge={false}
            />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,28%)_1fr] items-start">
                    {/* Columna izquierda: solo texto, agrupado */}
                    <div className="flex flex-col gap-4">
                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    <Smartphone className="size-4" />
                                    Dispositivo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-0">
                                <div className="space-y-2">
                                    <DetailRow label="Propietario" value={device.owner} />
                                    <DetailRow label="Certificado" value={device.certificateType} />
                                    <DetailRow label="Estado de daño" value={device.tamperStatus} />
                                    <DetailRow label="Sistema operativo" value={device.operativeSystem} />
                                    <DetailRow label="Versión SDK" value={device.sdkVersion} />
                                    <DetailRow label="Lecturas banda magnética" value={device.msrReadCount} />
                                    <DetailRow label="Lecturas por chip" value={device.chipReadCount} />
                                </div>
                                <div className="border-t pt-3">
                                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Errores</p>
                                    <div className="space-y-2">
                                        <DetailRow label="Track 1" value={device.msrTrack1ErrorCounter} />
                                        <DetailRow label="Track 2" value={device.msrTrack2ErrorCounter} />
                                        <DetailRow label="Track 3" value={device.msrTrack3ErrorCounter} />
                                        <DetailRow label="Chip" value={device.chipReadError} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    <Battery className="size-4" />
                                    Batería
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 pt-0">
                                <DetailRow label="Batería disponible" value={battery.batteryAvailable} />
                                <DetailRow label="Estado" value={battery.batteryStatus} />
                                <DetailRow label="Tiene batería" value={battery.hasBattery} />
                                <DetailRow label="Voltaje" value={battery.voltage} />
                                <DetailRow label="Capacidad" value={battery.capacity} />
                                <DetailRow label="Estado batería interna" value={battery.internalBatteryStatus} />
                                <DetailRow label="Voltaje batería interna" value={battery.internalBatteryVoltage} />
                                <DetailRow label="Temperatura" value={battery.temperature} />
                                <DetailRowYesNo label="Cargando" value={battery.charging} />
                                <DetailRowYesNo label="Conectada" value={battery.connected} />
                            </CardContent>
                        </Card>

                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    <Printer className="size-4" />
                                    Impresora
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 pt-0">
                                <DetailRow label="Impresora disponible" value={printer.printerAvailable} />
                                <DetailRow label="Temperatura" value={printer.temperature} />
                                <DetailRow label="Voltaje cabezal" value={printer.headVoltage} />
                            </CardContent>
                        </Card>

                        <Card className="border-border/60">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    <Wifi className="size-4" />
                                    Conexión
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 pt-0">
                                <DetailRow label="Calidad GSM" value={connection.gsmQuality} />
                                <DetailRow label="Tasa de error" value={connection.errorRate} />
                                <DetailRow label="Estado SIM" value={connection.gsmSIMState} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Columna derecha: gráficos y bloques visuales */}
                    <div className="flex flex-col gap-6">

                        {/* Conexiones */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                            <Card className="border-border/60">
                                <CardContent className="flex flex-col items-center pt-6">
                                    <WifiSignalIndicator
                                        value={Number(connection.wifiSignal ?? 0)}
                                        networkName={formatValue(connection.wifiName)}
                                        label="WiFi"
                                    />
                                </CardContent>
                            </Card>
                            <Card className="border-border/60">
                                <CardContent className="flex flex-col items-center pt-6">
                                    <WifiSignalIndicator
                                        value={Number(connection.gsmMobileSignal ?? 0)}
                                        networkName={formatValue(connection.mobileOperatorName)}
                                        label="GSM"
                                    />
                                </CardContent>
                            </Card>
                            <Card className="border-border/60">
                                <CardContent className="flex flex-col items-center gap-1 pt-6">
                                    <span className="text-sm font-medium text-foreground">Ethernet</span>
                                    {String(connection.ethernet).toUpperCase() === "SÍ" || String(connection.ethernet).toUpperCase() === "SI" ? (
                                        <Monitor className="size-10 text-green-500" aria-hidden />
                                    ) : (
                                        <ScreenShareOff className="size-10 text-red-500" aria-hidden />
                                    )}
                                    <span className="text-sm text-muted-foreground">{formatValue(connection.ethernet)}</span>
                                </CardContent>
                            </Card>

                            <Card className="border-border/60">
                                <CardContent className="flex flex-col items-center gap-1 pt-6">
                                    <span className="text-sm font-medium text-foreground">Red inicializada</span>
                                    {String(connection.networkInitialized).toUpperCase() === "SÍ" || String(connection.networkInitialized).toUpperCase() === "SI" ? (
                                        <Globe className="size-10 text-green-500" aria-hidden />
                                    ) : (
                                        <GlobeLock className="size-10 text-red-500" aria-hidden />
                                    )}
                                    <span className="text-sm text-muted-foreground">{formatValue(connection.networkInitialized)}</span>
                                </CardContent>
                            </Card>
                            <Card className="border-border/60">
                                <CardContent className="flex flex-col items-center gap-1 pt-6">
                                    <span className="text-sm font-medium text-foreground">SIM presente</span>
                                    {connection.gsmSIMPresent === true || String(connection.gsmSIMPresent).toUpperCase() === "SÍ" || String(connection.gsmSIMPresent).toUpperCase() === "SI" ? (
                                        <span className="text-lg font-semibold text-green-500">Sí</span>
                                    ) : (
                                        <span className="text-lg font-semibold text-red-500">No</span>
                                    )}
                                    <span className="text-sm text-muted-foreground">{formatValue(connection.gsmSIMPresent)}</span>
                                </CardContent>
                            </Card>
                            <Card className="border-border/60">
                                <CardContent className="flex flex-col items-center gap-1 pt-6">
                                    <span className="text-sm font-medium text-foreground">Estado impresora</span>
                                    <span className={`text-sm font-medium ${printer.printerState === "Sin error" ? "text-green-600" : "text-red-600"}`}>
                                        {formatValue(printer.printerState)}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Card className="border-border/60">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                        Almacenamiento
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-6 pt-0 sm:grid-cols-2 place-items-center">
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
                            </Card>
                            <Card className="border-border/60">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                        Nivel de carga
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center pt-0">
                                    <ChargeLevelRadial value={Number(battery.chargeLevel ?? 0)} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PosHealthDetail;
