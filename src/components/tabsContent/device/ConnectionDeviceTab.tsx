import DetailRow from "@/components/text/detailRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WifiSignalIndicator from "@/components/charts/WifiSignalIndicator";
import EmptyCardLoader from "@/components/loaders/EmptyCardLoader";
import { Monitor, ScreenShareOff, Globe, GlobeLock, CardSim } from "lucide-react";
import type { ConnectionDeviceTabProps } from "@/types/device/ConnectionDeviceTabProps";

const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return "";
    if (typeof value === "boolean") return value ? "Sí" : "No";
    return String(value);
};

export const ConnectionDeviceTab = ({ connection, isLoading }: ConnectionDeviceTabProps) => {
    return (
        <>
            {isLoading ?
                <EmptyCardLoader title="Cargando datos de la conexión" description="Por favor espere mientras cargamos los datos de la conexión. No actualice la página." okIcon={false} />
                : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4 items-start">
                        <Card className="border-border/60">
                            <CardContent className="flex flex-col items-center pt-0">
                                <WifiSignalIndicator value={Number(connection.wifiSignal ?? 0)} networkName={formatValue(connection.wifiName)} label="WiFi" />
                            </CardContent>
                        </Card>
                        <Card className="border-border/60">
                            <CardContent className="flex flex-col items-center pt-0">
                                <WifiSignalIndicator value={Number(connection.gsmMobileSignal ?? 0)} networkName={formatValue(connection.mobileOperatorName)} label="GSM" />
                            </CardContent>
                        </Card>
                        <Card className="border-border/60">
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1 items-center ">
                                        <span className="text-sm font-medium text-foreground">Ethernet</span>
                                        {String(connection.ethernet).toUpperCase() === "SÍ" || String(connection.ethernet).toUpperCase() === "SI" ? (
                                            <Monitor className="size-10 text-green-500" aria-hidden />
                                        ) : (
                                            <ScreenShareOff className="size-10 text-red-500" aria-hidden />
                                        )}
                                        <span className="text-sm text-muted-foreground">{connection.ethernet ?? "—"}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-medium text-foreground">Red Iniciada</span>
                                        {String(connection.networkInitialized).toUpperCase() === "SÍ" || String(connection.networkInitialized).toUpperCase() === "SI" ? (
                                            <Globe className="size-10 text-green-500" aria-hidden />
                                        ) : (
                                            <GlobeLock className="size-10 text-red-500" aria-hidden />
                                        )}
                                        <span className="text-sm text-muted-foreground">{connection.networkInitialized ?? "—"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border/60">
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="text-sm font-medium text-foreground">SIM Presente</span>
                                        {String(connection.gsmSIMPresent).toUpperCase() === "SÍ" || String(connection.gsmSIMPresent).toUpperCase() === "SI" ? (
                                            <CardSim className="size-8 text-green-500" aria-hidden />
                                        ) : (
                                            <CardSim className="size-8 text-red-500" aria-hidden />
                                        )}
                                        <span className="text-sm text-muted-foreground">{connection.gsmSIMPresent ?? "—"}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="text-sm font-medium text-foreground">Estado de SIM</span>
                                        <span className="text-sm text-muted-foreground">{connection.gsmSIMState ?? "—"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
        </>
    );
};