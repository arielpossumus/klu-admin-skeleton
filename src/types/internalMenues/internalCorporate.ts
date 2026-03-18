import { Briefcase, Building2, FileText, Users } from "lucide-react";

export const INTERNAL_CORPORATE_NAV = [
    { id: "general", label: "Datos generales", icon: Building2 },
    { id: "legal", label: "Datos legales", icon: FileText },
    { id: "contacts", label: "Contactos", icon: Users },
    { id: "commercial", label: "Modelo comercial", icon: Briefcase },
] as const;