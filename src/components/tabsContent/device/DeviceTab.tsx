import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageRadial } from "@/components/charts/UsageRadial";
import { formatKBtoMB } from "@/lib/format";
import EmptyCardLoader from "@/components/loaders/EmptyCardLoader";
import DetailRow from "../../text/detailRow";

/** Objeto con los datos del dispositivo (detalle / getDeviceById.dispositivo) */
interface DeviceDetail {
    totalRAM?: number;
    totalFlash?: number;
    usedRam?: number;
    usedFlash?: number;
    owner?: string;
    certificateType?: string;
    tamperStatus?: string;
    operativeSystem?: string;
    sdkVersion?: string;
    msrReadCount?: number;
    chipReadCount?: number;
    msrTrack1ErrorCounter?: number;
    msrTrack2ErrorCounter?: number;
    msrTrack3ErrorCounter?: number;
    chipReadError?: number;
}

interface DeviceTabProps {
    device: DeviceDetail;
    isLoading: boolean;
}

export const DeviceTab = ({ device, isLoading }: DeviceTabProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[30%_1fr] mt-4 items-start">
            <Card className="border-border/60">
                {isLoading ?
                    <EmptyCardLoader title="Cargando datos de almacenamiento" description="Por favor espere mientras cargamos los datos del dispositivo. No actualice la página." okIcon={false} />
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
    );
};