import { Briefcase, Building2, FileText, Store, Users } from "lucide-react";

export const INTERNAL_COMMERCES_NAV = [
    { id: "general", label: "Datos generales", icon: Building2 },
    { id: "legal", label: "Datos legales", icon: FileText },
    { id: "contacts", label: "Contactos", icon: Users },
    { id: "finances", label: "Finanzas", icon: Briefcase },
    { id: "msiCommission", label: "Comision por MSI", icon: Store },
    { id: "paymentTerms", label: "Plazos de pago", icon: Store },
    { id: "depositData", label: "Datos de depósito", icon: Store },
    { id: "commercialModel", label: "Modelo comercial", icon: Store },
    { id: "promotions", label: "Promociones", icon: Store },
    { id: "modules", label: "Modulos", icon: Store },
    { id: "operationData", label: "Datos de operacion", icon: Store },
] as const;