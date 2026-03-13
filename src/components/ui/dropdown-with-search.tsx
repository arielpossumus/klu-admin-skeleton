"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export type DropdownWithSearchOption = {
    value: string;
    label: string;
};

type DropdownWithSearchProps = {
    options: DropdownWithSearchOption[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    id?: string;
    className?: string;
    disabled?: boolean;
    emptyLabel?: string;
};

export function DropdownWithSearch({
    options,
    value,
    onValueChange,
    placeholder = "Seleccione",
    id,
    className,
    disabled = false,
    emptyLabel = "Sin resultados",
}: DropdownWithSearchProps) {
    const [open, setOpen] = React.useState(false);

    const optionsWithEmpty = placeholder
        ? [{ value: "", label: placeholder }, ...options]
        : options;

    const selectedOption = optionsWithEmpty.find((opt) => opt.value === value);
    const displayLabel = selectedOption?.label ?? placeholder;

    const handleSelect = (selectedValue: string) => {
        const option = optionsWithEmpty.find(
            (opt) => opt.label.toLowerCase() === selectedValue.toLowerCase()
        );
        if (option) {
            onValueChange(option.value);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label={displayLabel}
                    disabled={disabled}
                    className={cn(
                        "h-9 w-full justify-between font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <span className="truncate">{displayLabel}</span>
                    <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command shouldFilter={true}>
                    <CommandInput placeholder="Buscar..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>{emptyLabel}</CommandEmpty>
                        <CommandGroup>
                            {optionsWithEmpty.map((opt) => (
                                <CommandItem
                                    key={opt.value || "__empty__"}
                                    value={opt.label}
                                    onSelect={handleSelect}
                                >
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
