const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return "";
    if (typeof value === "boolean") return value ? "Sí" : "No";
    return String(value);
};

export const DetailRow = ({ label, value }: { label: string; value: unknown; }) => (
    <div className="flex flex-col gap-0.5 py-1 mb-4">
        <span className="text-sm  text-muted-foreground text-foreground">{label}:</span>
        <span className="text-sm  font-medium">{formatValue(value)}</span>
    </div>
);