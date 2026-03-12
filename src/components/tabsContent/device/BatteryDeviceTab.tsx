import { ChargeLevelRadial } from "../../charts/ChargeLevelRadial";
import DetailRowYesNo from "../../text/detailRowYesNo";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import EmptyCardLoader from "../../loaders/EmptyCardLoader";
import DetailRow from "../../text/detailRow";
import type { BatteryDetail } from "@/types/device/BatteryDetail";
import type { BatteryDeviceTabProps } from "@/types/device/BatteryDeviceTabProps";

export const BatteryDeviceTab = ({ battery, isLoading }: BatteryDeviceTabProps) => {
    return (
        <>
            {isLoading ?
                <EmptyCardLoader title="Cargando datos de la batería" description="Por favor espere mientras cargamos los datos de la batería. No actualice la página." okIcon={false} />
                : (
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
                )}
        </>
    );

};