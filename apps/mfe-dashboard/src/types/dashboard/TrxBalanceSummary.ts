/** Resumen por moneda desde `getTrxValues` (mock/API). */
export type TrxBalanceSummary = {
    currency: string;
    totalBalance: number;
    accumulatedAmountDay: number;
    salesNumber: number;
    rejectionNumber: number;
    transactionDailyNumber: number;
};

export type BalanceCurrencyCode = "MXN" | "ARS" | "USD";

export type TrxBalancesBundle = Record<BalanceCurrencyCode, TrxBalanceSummary>;
