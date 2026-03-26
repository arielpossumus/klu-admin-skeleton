import type { KeyboardEvent } from "react";
import { Link } from "react-router";
import { Building2, LayoutGrid, Smartphone, Store, UserCircle } from "lucide-react";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { DASHBOARD_SHORTCUT_PATHS } from "@/config/dashboardShortcuts";
import { cn } from "@/lib/utils";

const shortcutClassName = cn(
    "flex min-h-[4.5rem] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3",
    "text-left text-sm font-medium text-white transition-colors",
    "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a3530]"
);

export const DashboardProductShortcuts = () => {
    const handleMiCuenta = () => {
        console.log("Mi cuenta");
    };

    const handleMiCuentaKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        handleMiCuenta();
    };

    return (
        <BentoPanel
            className="bg-[var(--color-dark-blue)]"
            title="Accesos directos"
            icon={<LayoutGrid className="size-4" aria-hidden />}
        >
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
                <li>
                    <Link
                        to={DASHBOARD_SHORTCUT_PATHS.addTerminal}
                        className={shortcutClassName}
                        aria-label="Ir a POS Health para gestión de terminales"
                    >
                        <Smartphone className="size-5 shrink-0 text-amber-400" aria-hidden />
                        <span>Agregar Terminal</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to={DASHBOARD_SHORTCUT_PATHS.addCorporate}
                        className={shortcutClassName}
                        aria-label="Agregar corporativo"
                    >
                        <Building2 className="size-5 shrink-0 text-amber-400" aria-hidden />
                        <span>Agregar Corporativo</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to={DASHBOARD_SHORTCUT_PATHS.addComercio}
                        className={shortcutClassName}
                        aria-label="Ir a corporativos para gestionar comercios"
                    >
                        <Store className="size-5 shrink-0 text-amber-400" aria-hidden />
                        <span>Agregar Comercio</span>
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        className={shortcutClassName}
                        aria-label="Mi cuenta"
                        onClick={handleMiCuenta}
                        onKeyDown={handleMiCuentaKeyDown}
                    >
                        <UserCircle className="size-5 shrink-0 text-amber-400" aria-hidden />
                        <span>Mi cuenta</span>
                    </button>
                </li>
            </ul>
        </BentoPanel>
    );
};
