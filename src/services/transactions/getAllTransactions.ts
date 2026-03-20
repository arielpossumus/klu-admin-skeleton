import { axiosClient } from "@/services/axiosClient";
import type { RecentMovementRow } from "@/types/transactions/RecentMovementRow";
import type { TransactionListApiRow, TransactionListResponse } from "@/types/transactions/TransactionListResponse";

const MOCK_ENDPOINT = "/mockups/transactions/getAllTransactions.json";

const formatFechaHora = (date: string | undefined, hour: string | undefined): string => {
    if (!date?.trim()) return hour?.trim() ?? "—";
    const parts = date.split("-");
    if (parts.length === 3) {
        const [y, m, d] = parts;
        return `${d}/${m}/${y}${hour ? ` ${hour}` : ""}`;
    }
    return `${date}${hour ? ` ${hour}` : ""}`;
};

const mapRowToRecentMovement = (row: TransactionListApiRow, index: number): RecentMovementRow => {
    const idNum = row.id ?? row.transaction;
    const id = idNum != null ? String(idNum) : `tx-${index}`;
    const business = row.businessName ?? row.business_name ?? "";
    const typeLabel = row.type?.trim() ?? "";
    const concepto =
        [typeLabel, business].filter((s) => s.length > 0).join(" — ") ||
        (typeof row.concept === "string" && row.concept.trim() !== "" && row.concept !== "-"
            ? row.concept
            : "Transacción");

    const rawAmount =
        (typeof row.amount === "string" && row.amount.trim() !== ""
            ? row.amount
            : typeof row.transaction_amount === "string" && row.transaction_amount.trim() !== ""
              ? row.transaction_amount
              : typeof row.totalAmount === "string"
                ? row.totalAmount
                : "$0.00") ?? "$0.00";

    const approved = Boolean(row.approved);
    const monto = `${approved ? "+ " : "- "}${rawAmount}`;

    const estado = approved
        ? "Aprobada"
        : typeof row.response_code_description === "string" && row.response_code_description.trim() !== ""
          ? row.response_code_description
          : typeof row.status === "string" && row.status.trim() !== ""
            ? row.status
            : "Rechazada";

    return {
        id,
        fecha: formatFechaHora(
            typeof row.date === "string" ? row.date : undefined,
            typeof row.hour === "string" ? row.hour : undefined
        ),
        concepto,
        monto,
        tipo: approved ? "ingreso" : "egreso",
        estado,
    };
};

export const getAllTransactions = async (): Promise<TransactionListResponse> => {
    const { data } = await axiosClient.get<TransactionListResponse>(MOCK_ENDPOINT);
    const total = typeof data?.total === "number" ? data.total : 0;
    const rows = Array.isArray(data?.rows) ? data.rows : [];
    return { total, rows };
};

/**
 * Últimas N transacciones del listado (el mock viene ordenado con las más recientes primero).
 */
export const getLastTransactionsAsMovements = async (limit: number): Promise<RecentMovementRow[]> => {
    const { rows } = await getAllTransactions();
    const capped = Math.max(0, Math.min(limit, rows.length));
    return rows.slice(0, capped).map((row, index) => mapRowToRecentMovement(row, index));
};
