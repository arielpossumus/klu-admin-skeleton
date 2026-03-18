import { Check, X } from "lucide-react";

const DetailRowYesNo = ({ label, value }: { label: string; value: unknown; }) => {
    const isYes = value === "Sí" || value === true;
    return (
        <div className="flex flex-col gap-0.5 py-1">
            <span className="text-sm font-medium text-foreground">{label}:</span>
            <span className="flex items-center gap-1.5 text-sm" aria-label={isYes ? "Sí" : "No"}>
                {isYes ? (
                    <Check className="size-4 shrink-0 text-green-500" aria-hidden />
                ) : (
                    <X className="size-4 shrink-0 text-red-500" aria-hidden />
                )}
                <span className="text-muted-foreground">{isYes ? "Sí" : "No"}</span>
            </span>
        </div>
    );
};

export default DetailRowYesNo;