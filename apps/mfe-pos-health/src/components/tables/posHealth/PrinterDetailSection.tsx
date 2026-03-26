import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { DevicePrinter } from "@/types/device/DevicePrinter";

interface PrinterDetailSectionProps {
    printer: DevicePrinter;
}

export const PrinterDetailSection = ({ printer }: PrinterDetailSectionProps) => {
    return (
        <div className="text-sm">
            <p className="mb-2 font-medium text-foreground">Impresora</p>
            <Table>
                <TableHeader>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableHead className="h-8">Impresora disponible</TableHead>
                        <TableHead className="h-8">Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-muted hover:bg-transparent">
                        <TableCell className="py-2">
                            <Badge className={printer.printerAvailable === "Disponible" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                                {printer.printerAvailable ?? "—"}
                            </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                            <Badge className={printer.printerState === "Sin error" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                                {printer.printerState ?? "—"}
                            </Badge>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
