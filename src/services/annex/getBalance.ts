import { axiosClient } from "@/services/axiosClient";
import type {
    BalanceCurrencyCode,
    TrxBalanceSummary,
    TrxBalancesBundle,
} from "@/types/dashboard/TrxBalanceSummary";

const ENDPOINT = "/mockups/getTrxValues.json";

const emptySummary = (currency: BalanceCurrencyCode): TrxBalanceSummary => ({
    currency,
    totalBalance: 0,
    accumulatedAmountDay: 0,
    salesNumber: 0,
    rejectionNumber: 0,
    transactionDailyNumber: 0,
});

const emptyBundle = (): TrxBalancesBundle => ({
    MXN: emptySummary("MXN"),
    ARS: emptySummary("ARS"),
    USD: emptySummary("USD"),
});

const num = (raw: unknown): number => {
    const n = typeof raw === "number" ? raw : Number(raw);
    return Number.isFinite(n) ? n : 0;
};

const str = (raw: unknown, fallback: string): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalizeSummary = (raw: unknown, defaultCurrency: BalanceCurrencyCode): TrxBalanceSummary => {
    if (raw == null || typeof raw !== "object") return emptySummary(defaultCurrency);
    const o = raw as Record<string, unknown>;
    return {
        currency: str(o.currency, defaultCurrency),
        totalBalance: num(o.totalBalance),
        accumulatedAmountDay: num(o.accumulatedAmountDay),
        salesNumber: Math.round(num(o.salesNumber)),
        rejectionNumber: Math.round(num(o.rejectionNumber)),
        transactionDailyNumber: Math.round(num(o.transactionDailyNumber)),
    };
};

const normalize = (raw: unknown): TrxBalancesBundle => {
    if (raw == null || typeof raw !== "object") return emptyBundle();
    const root = raw as Record<string, unknown>;
    const dataResponse = root.data_response;
    if (dataResponse == null || typeof dataResponse !== "object") return emptyBundle();
    const dr = dataResponse as Record<string, unknown>;

    const mxn = normalizeSummary(dr.MXN ?? dr.mxn, "MXN");
    const ars = normalizeSummary(dr.ARS ?? dr.ars, "ARS");
    const usd = normalizeSummary(dr.USD ?? dr.usd, "USD");

    const hasOnlyLegacyMxn =
        (dr.MXN != null || dr.mxn != null) &&
        dr.ARS == null &&
        dr.USD == null &&
        dr.ars == null &&
        dr.usd == null;
    if (hasOnlyLegacyMxn) {
        return {
            MXN: mxn,
            ARS: { ...mxn, currency: "ARS" },
            USD: { ...mxn, currency: "USD" },
        };
    }

    return { MXN: mxn, ARS: ars, USD: usd };
};

export const getBalance = async (): Promise<TrxBalancesBundle> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
