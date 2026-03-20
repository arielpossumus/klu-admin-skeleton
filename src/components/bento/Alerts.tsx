import { Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { getAlerts } from "@/services/alerts/alertsService";
import type { DashboardAlert, DashboardAlertType } from "@/types/dashboard/DashboardAlert";

const ALERT_STYLES: Record<
    DashboardAlertType,
    { card: string; title: string; description: string }
> = {
    warning: {
        card: "border-amber-400/30 bg-amber-500/10",
        title: "text-amber-200",
        description: "text-amber-100/80",
    },
    info: {
        card: "border-sky-400/30 bg-sky-500/10",
        title: "text-sky-200",
        description: "text-sky-100/80",
    },
    error: {
        card: "border-rose-400/35 bg-rose-500/10",
        title: "text-rose-200",
        description: "text-rose-100/80",
    },
};

const AlertListItem = ({ alert }: { alert: DashboardAlert }) => {
    const styles = ALERT_STYLES[alert.type];
    return (
        <li
            className={cn("rounded-2xl border px-4 py-3", styles.card)}
            role="listitem"
        >
            <span className={cn("font-semibold", styles.title)}>{alert.title}</span>
            <p className={cn("mt-1 text-sm", styles.description)}>{alert.description}</p>
        </li>
    );
};

export const Alerts = () => {
    const { data: alerts, isPending, isError } = useQuery({
        queryKey: ["dashboard", "alerts"],
        queryFn: getAlerts,
    });

    return (
        <BentoPanel
            title="Alertas y recordatorios"
            className="bg-[var(--color-dark)]"
            icon={<Sparkles className="size-4" aria-hidden />}
        >
            {isPending ? (
                <p className="py-6 text-center text-sm text-white/55">Cargando alertas…</p>
            ) : isError ? (
                <p className="py-6 text-center text-sm text-rose-300">No se pudieron cargar las alertas.</p>
            ) : alerts == null || alerts.length === 0 ? (
                <p className="py-6 text-center text-sm text-white/55">No hay alertas por mostrar.</p>
            ) : (
                <ul className="space-y-3 text-sm text-white/85" role="list">
                    {alerts.map((alert) => (
                        <AlertListItem key={alert.id} alert={alert} />
                    ))}
                </ul>
            )}
        </BentoPanel>
    );
};
