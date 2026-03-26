const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return "—";
    if (typeof value === "boolean") return value ? "Sí" : "No";
    return String(value);
};

/** Fila compacta: label y valor en una sola línea, para reducir scroll. */
export const CompactRow = ({ label, value }: { label: string; value: unknown }) => (
    <div className="flex items-baseline justify-between gap-2 py-0.5">
        <span className="truncate text-xs text-muted-foreground">{label}</span>
        <span className="shrink-0 text-right text-xs font-medium tabular-nums">{formatValue(value)}</span>
    </div>
);