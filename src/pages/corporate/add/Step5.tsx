import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import type { AddCorporateFormValues, ModulesFormValues } from "@/types/corporate/addCorporate";

const MODULES: { key: keyof ModulesFormValues; label: string; }[] = [
    { key: "inicio", label: "INICIO" },
    { key: "posHealth", label: "POS HEALTH" },
    { key: "transacciones", label: "TRANSACCIONES" },
    { key: "versionesTpv", label: "VERSIONES TPV" },
    { key: "corporativo", label: "CORPORATIVO" },
    { key: "comercio", label: "COMERCIO" },
    { key: "sucursal", label: "SUCURSAL" },
    { key: "dispositivos", label: "DISPOSITIVOS" },
    { key: "usuarios", label: "USUARIOS" },
    { key: "comercioMovil", label: "COMERCIO MOVIL" },
    { key: "dispositivoMovil", label: "DISPOSITIVO MOVIL" },
    { key: "finanzas", label: "FINANZAS" },
    { key: "monitoreoMomentum", label: "MONITOREO MOMENTUM" },
    { key: "transaccional", label: "TRANSACCIONAL" },
    { key: "ecommerce", label: "ECOMMERCE" },
    { key: "moTo", label: "MO/TO" },
    { key: "cargosProgramados", label: "CARGOS PROGRAMADOS" },
    { key: "cargosRecurrentes", label: "CARGOS RECURRENTES" },
    { key: "tokenizacion", label: "TOKENIZACIÓN" },
    { key: "antifraude", label: "ANTIFRAUDE" },
    { key: "urlDePago", label: "URL DE PAGO" },
    { key: "miEcommerce", label: "MI ECOMMERCE" },
    { key: "botonDePago", label: "BOTÓN DE PAGO" },
    { key: "threeDSecure", label: "3DSECURE" },
    { key: "paymentMethodCheckout", label: "PAYMENT METHOD CHECKOUT" },
    { key: "altaDeSpeis", label: "ALTA DE SPEIS" },
];

export function Step5() {
    const form = useFormContext<AddCorporateFormValues>();

    return (
        <div className="grid grid-cols-8 gap-4">
            {MODULES.map(({ key, label }) => (
                <div
                    key={key}
                    className="flex flex-col gap-2 rounded-md border border-border/60 bg-muted/30 p-3 min-w-0"
                >
                    <label
                        htmlFor={`modules.${key}`}
                        className="text-xs font-medium text-foreground leading-tight cursor-pointer"
                    >
                        {label}
                    </label>
                    <Controller
                        name={`modules.${key}`}
                        control={form.control}
                        render={({ field }) => (
                            <Switch
                                id={`modules.${key}`}
                                size="sm"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                aria-label={label}
                                className="data-[state=unchecked]:bg-error-dark data-[state=checked]:bg-success-dark"
                            />
                        )}
                    />
                </div>
            ))}
        </div>
    );
}
