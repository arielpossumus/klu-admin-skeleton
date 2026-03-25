import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { getRecentUsersCreated } from "@/services/users/getAllUsers";
import { cn } from "@/lib/utils";

const RECENT_USERS_LIMIT = 5;

const statusBadgeClass = (status: string) => {
    const u = status.toUpperCase();
    if (u.includes("CANCEL")) return "bg-rose-500/20 text-rose-200";
    if (u.includes("BLOQUE")) return "bg-amber-500/20 text-amber-200";
    return "bg-white/15 text-white/85";
};

const onShowMoreUsers = () => {
    console.log("Ver usuarios");
};

export const RecentUsersBento = () => {
    const { data: users = [], isPending, isError } = useQuery({
        queryKey: ["users", "recent-created", RECENT_USERS_LIMIT],
        queryFn: () => getRecentUsersCreated(RECENT_USERS_LIMIT),
    });

    return (
        <BentoPanel
            className="h-full bg-[var(--color-dark-blue)] lg:col-span-5"
            title="Últimos usuarios creados"
            icon={<Users className="size-4" aria-hidden />}
            showHeaderButton={true}
            headerButtonLabel="Ver usuarios"
            onHeaderButtonClick={onShowMoreUsers}
        >
            {isPending ? (
                <p className="py-6 text-center text-xs text-white/55">Cargando usuarios…</p>
            ) : isError ? (
                <p className="py-6 text-center text-xs text-rose-300">No se pudo cargar el listado.</p>
            ) : users.length === 0 ? (
                <p className="py-6 text-center text-xs text-white/55">No hay usuarios para mostrar.</p>
            ) : (
                <ul className="flex max-h-[min(22rem,55vh)] flex-col gap-2 overflow-y-auto pr-1" role="list">
                    {users.map((u) => (
                        <li
                            key={u.id}
                            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-white">{u.name}</p>
                                    <p className="truncate text-xs text-white/55">{u.email}</p>
                                </div>
                                <span
                                    className={cn(
                                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                        statusBadgeClass(u.status)
                                    )}
                                >
                                    {u.status}
                                </span>
                            </div>
                            <p className="mt-1.5 text-[10px] text-white/45">
                                <span className="text-white/60">Perfil:</span> {u.profile}
                                {u.level ? (
                                    <>
                                        {" "}
                                        · <span className="text-white/60">Nivel:</span> {u.level}
                                    </>
                                ) : null}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </BentoPanel>
    );
};
