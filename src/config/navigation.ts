import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Activity,
  Building,
  Store,
  Smartphone,
  CreditCard,
  Package,
  Wallet,
  Container,
  Settings,
} from "lucide-react";

export type NavSubItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

export type NavMainItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
};

export type NavEntry = NavMainItem | { type: "separator"; };

const isNavItem = (entry: NavEntry): entry is NavMainItem =>
  "title" in entry && "url" in entry;

/**
 * Configuración centralizada de navegación.
 * Alimenta el menú del sidebar y el breadcrumb del header.
 */
export const navMain: NavEntry[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "POS Health",
    url: "/pos-health",
    icon: Activity,

  },
  { type: "separator" },
  {
    title: "Corporativo",
    url: "/corporate",
    icon: Building,

  },
  {
    title: "Comercios",
    url: "#",
    icon: Store,
    items: [
      { title: "Comercios físicos", url: "#" },
      { title: "Comercios móvil", url: "#" },
      { title: "E-commerce", url: "#" },
    ],
  },
  { type: "separator" },
  {
    title: "Transacciones",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Finanzas",
    url: "#",
    icon: Wallet,
    items: [
      { title: "Conciliaciones", url: "#" },
      { title: "Contracargos", url: "#" },
      { title: "Transacciones a liquidar", url: "#" },
    ],
  },
  { type: "separator" },
  {
    title: "Dispositivos",
    url: "#",
    icon: Smartphone,
    items: [
      { title: "Grilla de dispositivos", url: "#" },
      { title: "Administración", url: "#" },
    ],
  },
  {
    title: "Catálogo",
    url: "#",
    icon: Container,
    items: [
      { title: "Marcas", url: "#" },
      { title: "Modelos", url: "#" },
      { title: "FiDD", url: "#" },
      { title: "Bines", url: "#" },
    ],
  },
  {
    title: "Versiones",
    url: "#",
    icon: Package,
    items: [
      { title: "Grilla de versiones", url: "#" },
      { title: "Asignar versiones", url: "#" },
      { title: "Gráficas de versiones", url: "#" },
    ],
  },
  { type: "separator" },
  {
    title: "Administración",
    url: "#",
    icon: Settings,
    items: [
      { title: "Usuarios", url: "#" },
      { title: "Monitoreo", url: "#" },
      { title: "Webhooks", url: "#" },
    ],
  },
];

/**
 * Construye el mapa path -> label a partir de navMain.
 * Incluye rutas de ítems y rutas padre (ej. /corporativo) para el breadcrumb.
 */
function buildPathToLabel(): Record<string, string> {
  const map: Record<string, string> = {};

  const add = (path: string, label: string) => {
    if (path && path !== "#") map[path] = label;
  };

  for (const entry of navMain) {
    if (!isNavItem(entry)) continue;

    if (entry.url !== "#") {
      add(entry.url, entry.title);
    } else if (entry.items?.length) {
      const firstUrl = entry.items[0].url;
      if (firstUrl && firstUrl !== "#") {
        const segments = firstUrl.split("/").filter(Boolean);
        if (segments.length > 0) {
          const parentPath = "/" + segments.slice(0, -1).join("/");
          add(parentPath, entry.title);
        }
      }
      for (const sub of entry.items) {
        if (sub.url !== "#") add(sub.url, sub.title);
      }
    }
  }

  return map;
}

const pathToLabel = buildPathToLabel();

const fallbackLabel = (segment: string): string =>
  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

export type BreadcrumbItem = { path: string; label: string; };

/**
 * Devuelve los ítems del breadcrumb para la pathname actual.
 * Usa los títulos definidos en navMain; si no existe, usa un fallback.
 */
export const getBreadcrumb = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  return segments.map((_, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const label = pathToLabel[path] ?? fallbackLabel(segments[index]);
    return { path, label };
  });
};
