import { useQuery } from "@tanstack/react-query";
import { ChartColumnBig } from "lucide-react";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { getLastTransactionsAsMovements } from "@/services/transactions/getAllTransactions";
import { cn } from "@/lib/utils";

const RECENT_TRANSACTIONS_LIMIT = 5;

const estadoBadgeClass = (estado: string) => {
    const u = estado.toUpperCase();
    if (u.includes("APROB")) return "bg-emerald-500/20 text-emerald-200";
    if (u.includes("RECHAZ") || u.includes("ERROR") || u.includes("FALL")) {
        return "bg-rose-500/20 text-rose-200";
    }
    return "bg-white/15 text-white/85";
};

const onShowMoreMovements = () => {
    console.log("Ver movimientos");
};

export const LastMovements = () => {
    const { data: recentMovements = [], isPending, isError } = useQuery({
        queryKey: ["transactions", "recent", RECENT_TRANSACTIONS_LIMIT],
        queryFn: () => getLastTransactionsAsMovements(RECENT_TRANSACTIONS_LIMIT),
    });

    return (
        <BentoPanel
            title="Últimas transacciones"
            className="h-full bg-[var(--color-primary)] lg:col-span-7"
            icon={<ChartColumnBig className="size-4" aria-hidden />}
            showHeaderButton={true}
            headerButtonLabel="Ver transacciones"
            onHeaderButtonClick={onShowMoreMovements}
        >
            {isPending ? (
                <p className="py-6 text-center text-xs text-white/55">Cargando últimos movimientos…</p>
            ) : isError ? (
                <p className="py-6 text-center text-xs text-rose-300">No se pudo cargar el listado.</p>
            ) : recentMovements.length === 0 ? (
                <p className="py-6 text-center text-xs text-white/55">No hay movimientos para mostrar.</p>
            ) : (
                <ul
                    className="flex max-h-[min(22rem,55vh)] flex-col gap-2 overflow-y-auto pr-1"
                    role="list"
                >
                    {recentMovements.map((m) => {
                        const isIngreso = m.tipo === "ingreso";
                        return (
                            <li
                                key={m.id}
                                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
                                role="listitem"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-white">
                                            {m.concepto}
                                        </p>
                                        <p className="truncate text-xs text-white/55">{m.fecha}</p>
                                    </div>
                                    <span
                                        className={cn(
                                            "shrink-0 text-sm font-semibold tabular-nums",
                                            isIngreso ? "text-emerald-300" : "text-rose-300"
                                        )}
                                    >
                                        {m.monto}
                                    </span>
                                </div>
                                <p className="mt-1.5 text-[10px] text-white/45">
                                    <span
                                        className={cn(
                                            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                            estadoBadgeClass(m.estado)
                                        )}
                                    >
                                        {m.estado}
                                    </span>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </BentoPanel>
    );
};
