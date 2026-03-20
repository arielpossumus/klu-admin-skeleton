export type RecentMovementRow = {
    id: string;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: "ingreso" | "egreso";
    estado: string;
};
