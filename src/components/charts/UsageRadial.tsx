interface UsageRadialProps {
    total: number;
    used: number;
    label: string;
    /** Valores en bruto para mostrar debajo del porcentaje (ej. total RAM, RAM usada) */
    displayTotal?: unknown;
    displayUsed?: unknown;
}

const getUsageLevel = (total: number, used: number): number => {
    if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(used) || used < 0) return 0;
    return Math.min(100, Math.max(0, (used / total) * 100));
};

/** 0-59% success, 60-79% warning, 80-100% error */
const getUsageColor = (level: number): string => {
    if (level < 60) return "var(--color-success-dark)";
    if (level < 80) return "var(--color-warning-dark)";
    return "var(--color-error-dark)";
};

export const UsageRadial = ({ total, used, label, displayTotal, displayUsed }: UsageRadialProps) => {
    const level = getUsageLevel(total, used);
    const outerR = 42;
    const innerR = 28;
    const cx = 50;
    const cy = 50;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (level / 100) * 2 * Math.PI;

    const strokeColor = getUsageColor(level);

    const toXY = (r: number, rad: number) => ({
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    });

    const startOuter = toXY(outerR, startAngle);
    const startInner = toXY(innerR, startAngle);
    const endOuter = toXY(outerR, endAngle);
    const endInner = toXY(innerR, endAngle);

    const largeArc = level >= 50 ? 1 : 0;
    const sectorPath =
        level <= 0
            ? ""
            : level >= 100
                ? null
                : [
                    `M ${startInner.x} ${startInner.y}`,
                    `L ${startOuter.x} ${startOuter.y}`,
                    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
                    `L ${endInner.x} ${endInner.y}`,
                    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${startInner.x} ${startInner.y}`,
                    "Z",
                ].join(" ");

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-foreground">{label}</span>
            <div className="relative inline-flex size-28 items-center justify-center">
                <svg
                    className="size-28"
                    viewBox="0 0 100 100"
                    aria-hidden
                >
                    <circle
                        cx={cx}
                        cy={cy}
                        r={(outerR + innerR) / 2}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={outerR - innerR}
                        className="text-muted"
                    />
                    {level >= 100 ? (
                        <circle
                            cx={cx}
                            cy={cy}
                            r={(outerR + innerR) / 2}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={outerR - innerR}
                        />
                    ) : (
                        sectorPath && (
                            <path
                                d={sectorPath}
                                fill={strokeColor}
                                className="transition-opacity duration-300"
                            />
                        )
                    )}
                </svg>
                <span
                    className="absolute text-lg font-semibold tabular-nums text-foreground"
                    style={{ color: strokeColor }}
                >
                    {Math.round(level)}%
                </span>
            </div>
            {(displayTotal != null || displayUsed != null) && (
                <div className="flex flex-col items-center gap-0.5 text-center text-sm text-muted-foreground">
                    <span>Total: {displayTotal != null ? String(displayTotal) : "—"}</span>
                    <span>Usado: {displayUsed != null ? String(displayUsed) : "—"}</span>
                </div>
            )}
        </div>
    );
};
