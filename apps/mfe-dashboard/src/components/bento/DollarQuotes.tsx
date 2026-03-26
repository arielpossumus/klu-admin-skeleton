import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getDollarQuotes } from "@/services/annex/getDollarQuotes";
import { formatDollarQuoteRate, type DollarQuoteCurrency } from "@/lib/format";

const MARKETS: { id: DollarQuoteCurrency; label: string; }[] = [
    { id: "MXN", label: "Peso mexicano" },
    { id: "ARS", label: "Peso argentino" },
];

export const DollarQuotes = () => {
    const [market, setMarket] = useState<DollarQuoteCurrency>("MXN");

    const { data: dollarQuotes, isPending: isDollarQuotesPending } = useQuery({
        queryKey: ["dashboard", "dollar-quotes"],
        queryFn: getDollarQuotes,
    });

    const section = market === "MXN" ? dollarQuotes?.mxn : dollarQuotes?.ars;
    const quotes = section?.quotes ?? [];
    const currencyPair = section?.currencyPair ?? (market === "MXN" ? "USD / MXN" : "USD / ARS");

    return (
        <BentoPanel
            className="lg:col-span-3 bg-[var(--color-primary)]"
            title="Cotización del dólar"
            icon={<DollarSign className="size-4" aria-hidden />}
        >
            {isDollarQuotesPending ? (
                <p className="py-6 text-center text-xs text-white/55">Cargando cotizaciones…</p>
            ) : (
                <>
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-4 lg:gap-5">
                        <ButtonGroup
                            className="mb-3 w-full [&>[data-slot=button]]:flex-1"
                            role="tablist"
                            aria-label="Moneda de cotización"
                        >
                            {MARKETS.map((m) => {
                                const selected = market === m.id;
                                return (
                                    <Button
                                        key={m.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={selected}
                                        size="sm"
                                        variant={selected ? "secondary" : "outline"}
                                        className={
                                            selected
                                                ? "border-white/20 bg-white/20 text-white hover:bg-white/25"
                                                : "border-white/25 bg-transparent text-white/90 hover:bg-white/10 hover:text-white"
                                        }
                                        onClick={() => setMarket(m.id)}
                                    >
                                        {m.label}
                                    </Button>
                                );
                            })}
                        </ButtonGroup>
                    </div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/50">
                        {currencyPair}
                    </p>
                    <ul className="grid grid-cols-2 gap-2" role="list">
                        {quotes.map((q) => (
                            <li
                                key={`${market}-${q.source}`}
                                className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2"
                            >
                                <p className="truncate text-xs font-semibold text-white">{q.source}</p>
                                <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[10px] leading-tight">
                                    <div>
                                        <span className="text-white/50">Compra</span>
                                        <p className="font-mono font-semibold tabular-nums text-emerald-200">
                                            $ {formatDollarQuoteRate(q.buy, market)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-white/50">Venta</span>
                                        <p className="font-mono font-semibold tabular-nums text-sky-200">
                                            $ {formatDollarQuoteRate(q.sell, market)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-center text-[10px] text-white/45">
                        Actualizado:{" "}
                        {new Intl.DateTimeFormat("es-MX", {
                            dateStyle: "short",
                            timeStyle: "short",
                        }).format(new Date())}
                    </p>
                </>
            )}
        </BentoPanel>
    );
};
