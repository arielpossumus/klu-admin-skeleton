import { Briefcase, Building2, FileText, Store, Users } from "lucide-react";

export const INTERNAL_CORPORATE_NAV = [
    { id: "general", label: "Datos generales", icon: Building2 },
    { id: "legal", label: "Datos legales", icon: FileText },
    { id: "contacts", label: "Contactos", icon: Users },
    { id: "commercial", label: "Modelo comercial", icon: Briefcase },
    { id: "commerce", label: "Comercios", icon: Store },
] as const;