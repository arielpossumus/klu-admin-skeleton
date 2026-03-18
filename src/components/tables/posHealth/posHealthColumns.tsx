import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Smartphone, Battery, Printer, Wifi, Eye } from "lucide-react";
import type { Device } from "@/types/device/Device";
import type { PosHealthColumnsParams } from "./posHealthTypes";

export const getPosHealthColumns = ({
    expandedRowId,
    expandedType,
    batteries,
    printers,
    connections,
    onActionClick,
}: PosHealthColumnsParams): ColumnDef<Device>[] => [
        { accessorKey: "posCorporation", header: "Corporativo" },
        { accessorKey: "posBusiness", header: "Comercio" },
        {
            accessorKey: "posBranch",
            header: "Sucursal",
            cell: ({ row }) => row.getValue("posBranch") ?? "—",
        },
        {
            accessorKey: "posSerial",
            header: "Serial",
            cell: ({ row }) => {
                const serial = row.getValue<string>("posSerial");
                if (!serial) return "—";
                return (
                    <Link
                        to={`/pos-health/${encodeURIComponent(serial)}`}
                        className="text-primary underline underline-offset-4 hover:no-underline"
                    >
                        {serial}
                    </Link>
                );
            },
        },
        { accessorKey: "posBrand", header: "Marca" },
        { accessorKey: "posModel", header: "Modelo" },
        {
            id: "status",
            header: "Estado de dispositivo",
            cell: ({ row }) => {
                const serial = row.original.posSerial;
                const device = row.original;
                const ram = Number(device.usedRam) || 0;
                const flash = Number(device.usedFlash) || 0;
                const hasDamage = device.tamperStatus !== "Sin daño";
                const isError = ram >= 80 || flash >= 80 || hasDamage;
                const isSuccess = ram < 60 && flash < 60 && !hasDamage;
                const deviceIconColor = isError
                    ? "var(--color-error-dark)"
                    : isSuccess
                        ? "var(--color-success-dark)"
                        : "var(--color-warning-dark)";

                const battery = batteries.find((b) => b.posSerial === serial);
                const batteryLevel = battery ? Number(battery.chargeLevel) || 0 : 0;
                const batteryAvailableOk = battery?.batteryAvailable === "Disponible";
                const batteryIsError = batteryLevel < 20 || battery?.batteryAvailable === "No disponible";
                const batteryIsSuccess = batteryLevel >= 50 && batteryAvailableOk;
                const batteryIconColor = !battery
                    ? "var(--color-warning-dark)"
                    : batteryIsError
                        ? "var(--color-error-dark)"
                        : batteryIsSuccess
                            ? "var(--color-success-dark)"
                            : "var(--color-warning-dark)";

                const printer = printers.find((p) => p.posSerial === serial);
                const printerAvailableOk = printer?.printerAvailable === "Disponible";
                const printerStateOk = printer?.printerState === "Sin error";
                const printerIsError = printer && (!printerAvailableOk || !printerStateOk);
                const printerIsSuccess = printer && printerAvailableOk && printerStateOk;
                const printerIconColor = !printer
                    ? "var(--color-warning-dark)"
                    : printerIsError
                        ? "var(--color-error-dark)"
                        : printerIsSuccess
                            ? "var(--color-success-dark)"
                            : "var(--color-warning-dark)";

                const connection = connections.find((c) => c.posSerial === serial);
                const wifiSignal = connection?.wifiSignal ?? 0;
                const simOk = connection?.gsmSIMState !== "No Presente";
                const networkOk = connection?.networkInitialized === "Sí";
                const connectionIsError = connection && (wifiSignal < 30 || !simOk || !networkOk);
                const connectionIsSuccess = connection && wifiSignal >= 60 && simOk && networkOk;
                const connectionIconColor = !connection
                    ? "var(--color-warning-dark)"
                    : connectionIsError
                        ? "var(--color-error-dark)"
                        : connectionIsSuccess
                            ? "var(--color-success-dark)"
                            : "var(--color-warning-dark)";

                const isDevice = expandedRowId === serial && expandedType === "device";
                const isBattery = expandedRowId === serial && expandedType === "battery";
                const isPrinter = expandedRowId === serial && expandedType === "printer";
                const isConnection = expandedRowId === serial && expandedType === "connection";
                return (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onActionClick(serial, "device")}
                            className={`cursor-pointer rounded p-1.5 transition-colors hover:bg-muted ${isDevice ? "bg-muted text-primary" : "text-muted-foreground"}`}
                            style={!isDevice ? { color: deviceIconColor } : undefined}
                            aria-label={isDevice ? "Ocultar detalles de dispositivo" : "Ver detalles de dispositivo"}
                        >
                            <Smartphone className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onActionClick(serial, "battery")}
                            className={`cursor-pointer rounded p-1.5 transition-colors hover:bg-muted ${isBattery ? "bg-muted text-primary" : "text-muted-foreground"}`}
                            style={!isBattery ? { color: batteryIconColor } : undefined}
                            aria-label={isBattery ? "Ocultar detalles de batería" : "Ver detalles de batería"}
                        >
                            <Battery className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onActionClick(serial, "printer")}
                            className={`cursor-pointer rounded p-1.5 transition-colors hover:bg-muted ${isPrinter ? "bg-muted text-primary" : "text-muted-foreground"}`}
                            style={!isPrinter ? { color: printerIconColor } : undefined}
                            aria-label={isPrinter ? "Ocultar detalles de impresora" : "Ver detalles de impresora"}
                        >
                            <Printer className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onActionClick(serial, "connection")}
                            className={`cursor-pointer rounded p-1.5 transition-colors hover:bg-muted ${isConnection ? "bg-muted text-primary" : "text-muted-foreground"}`}
                            style={!isConnection ? { color: connectionIconColor } : undefined}
                            aria-label={isConnection ? "Ocultar detalles de conexión" : "Ver detalles de conexión"}
                        >
                            <Wifi className="size-5" />
                        </button>
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const serial = row.original.posSerial;
                if (!serial) return "—";
                return (
                    <Link
                        to={`/pos-health/${encodeURIComponent(serial)}`}
                        className="inline-flex cursor-pointer items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                        aria-label="Ver detalle del dispositivo"
                    >
                        <Eye className="size-4" />
                    </Link>
                );
            },
        },
    ];
