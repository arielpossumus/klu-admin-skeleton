import { axiosClient } from "@/services/axiosClient";
import type {
    DollarQuoteItem,
    DollarQuoteMarket,
    DollarQuotesResponse,
} from "@/types/dashboard/DollarQuotesResponse";

/** Mock en `public/mockups/dashboard/` (misma convención que otros servicios estáticos). */
const ENDPOINT = "/mockups/dashboard/getDollarQuotes.json";

const str = (raw: unknown, fallback: string): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const emptyMarket = (pair: string): DollarQuoteMarket => ({
    currencyPair: pair,
    quotes: [],
});

const emptyResponse = (): DollarQuotesResponse => ({
    updatedAt: new Date().toISOString(),
    mxn: emptyMarket("USD / MXN"),
    ars: emptyMarket("USD / ARS"),
});

const normalizeQuote = (raw: unknown): DollarQuoteItem | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const source = o.source;
    const buy = o.buy;
    const sell = o.sell;
    if (typeof source !== "string" || source.trim() === "") return null;
    const buyNum = typeof buy === "number" ? buy : Number(buy);
    const sellNum = typeof sell === "number" ? sell : Number(sell);
    if (Number.isNaN(buyNum) || Number.isNaN(sellNum)) return null;
    return { source: source.trim(), buy: buyNum, sell: sellNum };
};

const normalizeQuotesArray = (raw: unknown): DollarQuoteItem[] => {
    if (!Array.isArray(raw)) return [];
    return raw.map(normalizeQuote).filter((q): q is DollarQuoteItem => q !== null);
};

const normalizeMarket = (raw: unknown, defaultPair: string): DollarQuoteMarket => {
    if (raw == null || typeof raw !== "object") return emptyMarket(defaultPair);
    const o = raw as Record<string, unknown>;
    return {
        currencyPair: str(o.currencyPair, defaultPair),
        quotes: normalizeQuotesArray(o.quotes),
    };
};

/** Formato nuevo: `mxn` + `ars`. Legado: `currencyPair` + `quotes` en raíz → solo MXN. */
const normalizeResponse = (raw: unknown): DollarQuotesResponse => {
    if (raw == null || typeof raw !== "object") return emptyResponse();
    const o = raw as Record<string, unknown>;
    const updatedAt =
        typeof o.updatedAt === "string" && o.updatedAt.trim() !== ""
            ? o.updatedAt.trim()
            : new Date().toISOString();

    const hasSplit = o.mxn != null || o.ars != null;
    if (hasSplit) {
        return {
            updatedAt,
            mxn: normalizeMarket(o.mxn, "USD / MXN"),
            ars: normalizeMarket(o.ars, "USD / ARS"),
        };
    }

    const legacyPair = str(o.currencyPair, "USD / MXN");
    const legacyQuotes = normalizeQuotesArray(o.quotes);
    return {
        updatedAt,
        mxn: { currencyPair: legacyPair, quotes: legacyQuotes },
        ars: emptyMarket("USD / ARS"),
    };
};

export const getDollarQuotes = async (): Promise<DollarQuotesResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalizeResponse(data);
};
