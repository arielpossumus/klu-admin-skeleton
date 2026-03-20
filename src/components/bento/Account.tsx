import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getOwnAccounts } from "@/services/accounts/getOwnAccount";
import type { AccountPurpose } from "@/types/accounts/OwnAccount";
import { formatTypeLabel, maskAccountNumber } from "@/lib/format";

const badgeAccountMeta = (type: string, currency: string): string => {
    const parts: string[] = [];
    const t = formatTypeLabel(type);
    if (t !== "") parts.push(t);
    const c = currency.trim();
    if (c !== "") parts.push(c);
    return parts.length > 0 ? parts.join(" · ") : "—";
};

const PURPOSES: { id: AccountPurpose; label: string; icon: typeof ArrowDownLeft; }[] = [
    { id: "cobros", label: "Cobros", icon: ArrowDownLeft },
    { id: "pagos", label: "Pagos", icon: ArrowUpRight },
];

export const Account = () => {
    const [purpose, setPurpose] = useState<AccountPurpose>("cobros");

    const { data, isPending, isError } = useQuery({
        queryKey: ["accounts", "own-bundle"],
        queryFn: getOwnAccounts,
    });

    const active = data?.[purpose];

    return (
        <BentoPanel
            className="lg:col-span-4 bg-[var(--color-dark)]"
            title="Cuenta operativa"
            icon={<CreditCard className="size-4" aria-hidden />}
        >
            {isPending ? (
                <p className="py-8 text-center text-sm text-white/55">Cargando cuenta…</p>
            ) : isError ? (
                <p className="py-8 text-center text-sm text-rose-300">No se pudo cargar la cuenta.</p>
            ) : (
                <>
                    <div className="grid auto-rows-min gap-4 lg:grid-cols-4 lg:gap-5">
                        <ButtonGroup
                            className="mb-4 w-full [&>[data-slot=button]]:flex-1"
                            role="tablist"
                            aria-label="Tipo de cuenta"
                        >
                            {PURPOSES.map((p) => {
                                const selected = purpose === p.id;
                                const Icon = p.icon;
                                return (
                                    <Button
                                        key={p.id}
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
                                        onClick={() => setPurpose(p.id)}
                                    >
                                        <Icon className="size-3.5" aria-hidden />
                                        {p.label}
                                    </Button>
                                );
                            })}
                        </ButtonGroup>
                    </div>
                    <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-[#0f4a42] to-[#06221e] p-4">
                        <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                            {active?.name || "Cuenta"}
                        </p>
                        {active?.alias ? (
                            <p className="mt-1 truncate text-[11px] text-white/45" title={active.alias}>
                                {active.alias}
                            </p>
                        ) : null}
                        <p className="mt-6 font-mono text-xl tracking-[0.25em] text-white">
                            {active?.id ? maskAccountNumber(active.id) : "•••• •••• •••• ——"}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
                            <span>
                                Titular: {active?.accountHolder ? active.accountHolder : "Sin titular"}
                            </span>
                            <span className="rounded-md bg-amber-500/20 px-2 py-1 font-semibold text-amber-300">
                                {badgeAccountMeta(active?.type ?? "", active?.currency ?? "")}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </BentoPanel>
    );
};
