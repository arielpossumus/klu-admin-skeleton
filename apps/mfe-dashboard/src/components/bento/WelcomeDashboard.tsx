import { LogOut, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getActiveUser } from "@/services/users/getActiveUser";
import { Button } from "@/components/ui/button";
import KluOs from "@/assets/KluOs.svg";
import ParagraphH1 from "@/components/text/ParagraphH1";
import ParagraphH3 from "@/components/text/ParagraphH3";

export const WelcomeDashboard = () => {
    const navigate = useNavigate();
    const { data: activeUser } = useQuery({
        queryKey: ["users", "active"],
        queryFn: getActiveUser,
    });
    const handleLogout = () => {
        navigate("/", { replace: true });
    };
    return (
        <div className="grid auto-rows-min gap-4 lg:grid-cols-12 lg:gap-5 mb-6">
            <div className="lg:col-span-2"   >
                <img src={KluOs} alt="KluOs" className="w-full" />
            </div>
            <div className="lg:col-span-10 mb-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 p-5 text-slate-900 shadow-lg md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-black/10">
                        <Sparkles className="size-6" aria-hidden />
                    </span>
                    <div>
                        <ParagraphH1
                            text={`Bienvenido de nuevo, ${activeUser?.firstName || activeUser?.userName || "Usuario"}!`}
                        />
                        <ParagraphH3 text="Este es tu resumen de saldos, movimientos recientes y salud del ecosistema POS en un solo mosaico." />

                    </div>
                </div>
                <div className="flex w-full min-w-0 flex-col items-stretch gap-3 p-4 md:max-w-md md:items-end md:self-center">
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full border-slate-800/30 bg-white/60 text-slate-900 hover:bg-white/90 sm:flex-1 md:w-auto md:flex-none"
                            onClick={handleLogout}
                        >
                            <LogOut className="size-4" aria-hidden />
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
