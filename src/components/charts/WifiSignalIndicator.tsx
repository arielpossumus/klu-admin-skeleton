import { Wifi } from "lucide-react";

const WifiSignalIndicator = ({ value, networkName }: { value: number; networkName?: string; }) => {
    const raw = Number(value);
    const signal = Math.min(100, Math.max(0, Number.isFinite(raw) ? raw : 0));
    const iconColor =
        signal >= 80
            ? "text-green-500"
            : signal >= 20
                ? "text-orange-400"
                : "text-red-500";
    const name = networkName != null && String(networkName).trim() !== "" ? String(networkName).trim() : null;

    return (
        <div className="flex flex-col items-center gap-2" aria-label={`Señal WIFI: ${Math.round(signal)}%${name ? `, Red: ${name}` : ""}`}>
            <span className="text-sm font-medium text-foreground">Señal WIFI</span>
            <div className="flex flex-col items-center gap-1">
                <Wifi className={`size-12 ${iconColor}`} aria-hidden />
                <span className={`text-sm font-semibold tabular-nums ${iconColor}`}>
                    {Math.round(signal)}%
                </span>
                {name !== null && (
                    <span className="text-sm text-muted-foreground text-center max-w-[180px] truncate" title={name}>
                        {name}
                    </span>
                )}
            </div>
        </div>
    );
};

export default WifiSignalIndicator;