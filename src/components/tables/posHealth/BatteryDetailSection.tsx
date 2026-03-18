import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { DeviceBattery } from "@/types/device/DeviceBattery";

interface BatteryDetailSectionProps {
    battery: DeviceBattery;
}

export const BatteryDetailSection = ({ battery }: BatteryDetailSectionProps) => {
    const level = battery.chargeLevel ?? 0;
    const barColor = level >= 50 ? "bg-green-500" : level >= 20 ? "bg-orange-400" : "bg-red-500";
    return (
        <div className="text-sm">
            <p className="mb-2 font-medium text-foreground">Batería</p>
            <Table>
                <TableHeader>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableHead className="h-8">Bateria disponible</TableHead>
                        <TableHead className="h-8">Nivel de carga</TableHead>
                        <TableHead className="h-8">Cargando</TableHead>
                        <TableHead className="h-8">Conectado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableCell className="py-2">{battery.batteryAvailable ?? "—"}</TableCell>
                        <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 rounded-full bg-muted">
                                    <div
                                        className={`h-full rounded-full ${barColor}`}
                                        style={{ width: `${Math.min(level, 100)}%` }}
                                    />
                                </div>
                                <span className="tabular-nums">{level}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="py-2">{battery.charging ?? "—"}</TableCell>
                        <TableCell className="py-2">{battery.connected ?? "—"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
