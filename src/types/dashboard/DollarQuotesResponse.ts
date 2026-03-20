export type DollarQuoteItem = {
    source: string;
    buy: number;
    sell: number;
};

/** Bloque de cotizaciones por moneda local (USD vs MXN / USD vs ARS). */
export type DollarQuoteMarket = {
    currencyPair: string;
    quotes: DollarQuoteItem[];
};

export type DollarQuotesResponse = {
    updatedAt: string;
    mxn: DollarQuoteMarket;
    ars: DollarQuoteMarket;
};
