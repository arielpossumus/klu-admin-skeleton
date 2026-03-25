import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export const WEEKDAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const;

export type WeekDaysButtonGroupProps = {
    /** Días actualmente seleccionados. */
    value: string[];
    /** Se llama al cambiar la selección (toggle de un día). */
    onValueChange: (days: string[]) => void;
    disabled?: boolean;
    id?: string;
    className?: string;
};

export function WeekDaysButtonGroup({
    value,
    onValueChange,
    disabled = false,
    id,
    className,
}: WeekDaysButtonGroupProps) {
    const handleToggleDay = (day: string) => {
        const current = value ?? [];
        const next = current.includes(day)
            ? current.filter((d) => d !== day)
            : [...current, day];
        onValueChange(next);
    };

    return (
        <ButtonGroup id={id} className={className}>
            {WEEKDAYS.map((day) => {
                const isSelected = value.includes(day);
                return (
                    <Button
                        key={day}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        disabled={disabled}
                        onClick={() => handleToggleDay(day)}
                        aria-pressed={isSelected}
                        aria-label={isSelected ? `Quitar ${day}` : `Seleccionar ${day}`}
                        className={
                            isSelected
                                ? "text-xs bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]"
                                : "text-xs bg-[var(--background)] text-foreground hover:bg-[var(--accent)] hover:text-accent-foreground"
                        }
                    >
                        {day}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
}
