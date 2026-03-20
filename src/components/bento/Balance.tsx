import { useState } from "react";
import { Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { formatBalanceCurrency, formatBalanceInteger } from "@/lib/format";
import { getBalance } from "@/services/annex/getBalance";
import type { BalanceCurrencyCode } from "@/types/dashboard/TrxBalanceSummary";

const CURRENCIES: { id: BalanceCurrencyCode; label: string; }[] = [
    { id: "USD", label: "Dólar (USD)" },
    { id: "ARS", label: "Peso argentino" },
    { id: "MXN", label: "Peso mexicano" },
];

export const Balance = () => {
    const [currency, setCurrency] = useState<BalanceCurrencyCode>("MXN");

    const { data, isPending, isError } = useQuery({
        queryKey: ["dashboard", "balance", "trx-values"],
        queryFn: getBalance,
    });

    const row = data?.[currency];

    const handleCurrencyClick = (code: BalanceCurrencyCode) => {
        setCurrency(code);
    };

    const saldoFormateado =
        row != null ? formatBalanceCurrency(row.totalBalance, currency) : "—";
    const ingresosHoy =
        row != null ? formatBalanceCurrency(row.accumulatedAmountDay, currency) : "—";
    const ventasFmt = row != null ? formatBalanceInteger(row.salesNumber, currency) : "—";
    const rechazoFmt = row != null ? formatBalanceInteger(row.rejectionNumber, currency) : "—";
    const transaccionesDiariasFmt =
        row != null ? formatBalanceInteger(row.transactionDailyNumber, currency) : "—";

    return (
        <BentoPanel
            className="lg:col-span-5 bg-[var(--color-dark-blue)]"
            title="Saldo disponible"
            icon={<Wallet className="size-4" aria-hidden />}
        >
            {isPending ? (
                <p className="py-6 text-center text-sm text-white/55">Cargando saldo…</p>
            ) : isError ? (
                <p className="py-6 text-center text-sm text-rose-300">No se pudo cargar el saldo.</p>
            ) : (
                <>
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-4 lg:gap-5">
                        <ButtonGroup
                            className="mb-4 w-full [&>[data-slot=button]]:flex-1"
                            role="tablist"
                            aria-label="Moneda del saldo"
                        >
                            {CURRENCIES.map((c) => {
                                const selected = currency === c.id;
                                return (
                                    <Button
                                        key={c.id}
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
                                        onClick={() => handleCurrencyClick(c.id)}
                                    >
                                        {c.label}
                                    </Button>
                                );
                            })}
                        </ButtonGroup>
                    </div>
                    <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        {saldoFormateado}
                    </p>
                    <p className="mt-2 text-sm text-white/65">
                        Incluye liquidaciones del día y saldo operativo consolidado (datos de demostración).
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-xl border border-white/10 bg-[var(--color-dark-blue-background)] p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-dark-blue-foreground)]">
                                Ingresos hoy
                            </p>
                            <p className="mt-1 text-lg font-bold text-[var(--color-accent)]">{ingresosHoy}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[var(--color-dark-blue-background)] p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-dark-blue-foreground)]">
                                Transacciones diarias
                            </p>
                            <p className="mt-1 text-lg font-bold text-[var(--color-info-dark)]">
                                {transaccionesDiariasFmt}
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[var(--color-dark-blue-background)] p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-dark-blue-foreground)]">
                                Realizadas
                            </p>
                            <p className="mt-1 text-lg font-bold text-[var(--color-success-dark)]">{ventasFmt}</p>
                        </div>
                        <div className="col-span-2 rounded-xl border border-white/10 bg-[var(--color-dark-blue-background)] p-3 sm:col-span-1">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-dark-blue-foreground)]">
                                Rechazadas
                            </p>
                            <p className="mt-1 text-lg font-bold text-[var(--color-error-dark)]">{rechazoFmt}</p>
                        </div>
                    </div>
                </>
            )}
        </BentoPanel>
    );
};
