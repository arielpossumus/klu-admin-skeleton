import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Device } from "@/types/device/Device";

interface DeviceDetailSectionProps {
    device: Device;
}

const barColor = (v: number) =>
    v >= 80 ? "bg-red-500" : v >= 60 ? "bg-orange-400" : "bg-green-500";

export const DeviceDetailSection = ({ device }: DeviceDetailSectionProps) => {
    const levelRam = Number(device.usedRam) || 0;
    const levelFlash = Number(device.usedFlash) || 0;
    return (
        <div className="text-sm">
            <p className="mb-2 font-medium text-foreground">Dispositivo</p>
            <Table>
                <TableHeader>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableHead className="h-8">Ram usada</TableHead>
                        <TableHead className="h-8">Flash usada</TableHead>
                        <TableHead className="h-8">Certificado</TableHead>
                        <TableHead className="h-8">Estatus de daño</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 rounded-full bg-muted">
                                    <div
                                        className={`h-full rounded-full ${barColor(levelRam)}`}
                                        style={{ width: `${Math.min(levelRam, 100)}%` }}
                                    />
                                </div>
                                <span className="tabular-nums">{levelRam}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 rounded-full bg-muted">
                                    <div
                                        className={`h-full rounded-full ${barColor(levelFlash)}`}
                                        style={{ width: `${Math.min(levelFlash, 100)}%` }}
                                    />
                                </div>
                                <span className="tabular-nums">{levelFlash}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="py-2">{device.certificateType ?? "—"}</TableCell>
                        <TableCell className="py-2">
                            <Badge className={device.tamperStatus === "Sin daño" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                                {device.tamperStatus ?? "—"}
                            </Badge>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
