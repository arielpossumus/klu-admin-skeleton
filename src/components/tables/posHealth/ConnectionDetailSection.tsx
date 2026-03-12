import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { DeviceConnection } from "@/types/device/DeviceConnection";

interface ConnectionDetailSectionProps {
    connection: DeviceConnection;
}

export const ConnectionDetailSection = ({ connection }: ConnectionDetailSectionProps) => {
    const signal = connection.wifiSignal ?? 0;
    const barColor = signal >= 60 ? "bg-green-500" : signal >= 30 ? "bg-orange-400" : "bg-red-500";
    return (
        <div className="text-sm">
            <p className="mb-2 font-medium text-foreground">Conexión</p>
            <Table>
                <TableHeader>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableHead className="h-8">Tipo de conexión</TableHead>
                        <TableHead className="h-8">Red WiFi</TableHead>
                        <TableHead className="h-8">Señal WiFi</TableHead>
                        <TableHead className="h-8">Estado SIM</TableHead>
                        <TableHead className="h-8">Ethernet</TableHead>
                        <TableHead className="h-8">Red inicializada</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableCell className="py-2">{connection.connectionType ?? "—"}</TableCell>
                        <TableCell className="py-2">{connection.wifiName ?? "—"}</TableCell>
                        <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-20 rounded-full bg-muted">
                                    <div
                                        className={`h-full rounded-full ${barColor}`}
                                        style={{ width: `${Math.min(signal, 100)}%` }}
                                    />
                                </div>
                                <span className="tabular-nums">{signal}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="py-2">
                            <Badge className={connection.gsmSIMState !== "No Presente" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                                {connection.gsmSIMState ?? "—"}
                            </Badge>
                        </TableCell>
                        <TableCell className="py-2">{connection.ethernet ?? "—"}</TableCell>
                        <TableCell className="py-2">
                            <Badge className={connection.networkInitialized === "Sí" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                                {connection.networkInitialized ?? "—"}
                            </Badge>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
