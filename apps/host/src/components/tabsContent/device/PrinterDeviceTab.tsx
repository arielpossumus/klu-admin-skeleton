import EmptyCardLoader from "../../loaders/EmptyCardLoader";
import { DetailRow } from "@/components/text/detailRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PrinterDeviceTabProps } from "@/types/device/PrinterDeviceTabProps";

export const PrinterDeviceTab = ({ printer, isLoading }: PrinterDeviceTabProps) => {
    return (
        <>
            {isLoading ?
                <EmptyCardLoader title="Cargando datos de la impresora" description="Por favor espere mientras cargamos los datos de la impresora. No actualice la página." okIcon={false} />
                : (
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
                )}
        </>
    );
};