import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

export interface Device {
  posId: number;
  posCorporation: string;
  posBusiness: string;
  posBranch?: string;
  posSerial: string;
  posBrand: string;
  posModel: string;
  usedFlash: number;
  usedRam: number;
  certificateType: string;
  tamperStatus: string;

}

export const deviceColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "posCorporation",
    header: "Corporativo",
  },
  {
    accessorKey: "posBusiness",
    header: "Comercio",
  },
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
  {
    accessorKey: "posBrand",
    header: "Marca",
  },
  {
    accessorKey: "posModel",
    header: "Modelo",
  },
  {
    accessorKey: "posModel",
    header: "Modelo",
  },
  {
    accessorKey: "usedRam",
    header: "Ram usada",
    cell: ({ row }) => {
      const level = row.getValue<number>("usedRam") ?? 0;

      const barColor =
        level >= 80
          ? "bg-red-500"
          : level >= 60
            ? "bg-orange-400"
            : "bg-green-500";

      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${barColor}`}
              style={{ width: `${Math.min(level, 100)}%` }}
            />
          </div>
          <span className="text-xs tabular-nums">{level}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "usedFlash",
    header: "Flash usada",
    cell: ({ row }) => {
      const level = row.getValue<number>("usedFlash") ?? 0;

      const barColor =
        level >= 80
          ? "bg-red-500"
          : level >= 60
            ? "bg-orange-400"
            : "bg-green-500";

      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${barColor}`}
              style={{ width: `${Math.min(level, 100)}%` }}
            />
          </div>
          <span className="text-xs tabular-nums">{level}%</span>
        </div>
      );
    },

  },
  {
    accessorKey: "certificateType",
    header: "Certificado",
  },
  {
    accessorKey: "tamperStatus",
    header: "Estatus de daño",
    cell: ({ row }) => {
      const status = row.getValue<string>("tamperStatus") ?? "—";
      const isOk = status === "Sin daño";

      return (
        <Badge className={isOk ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
          {status}
        </Badge>
      );
    },
  },
];
