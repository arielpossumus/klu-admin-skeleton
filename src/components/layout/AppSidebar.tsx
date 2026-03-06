import { Link, useLocation } from "react-router";
import { useCallback, useMemo, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Activity, Building, ChevronRight, Store, Smartphone, CreditCard, Package, Wallet, Container, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type NavSubItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

type NavMainItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
};

type NavEntry = NavMainItem | { type: "separator"; };

const isNavItem = (entry: NavEntry): entry is NavMainItem =>
  "title" in entry && "url" in entry;

const navMain: NavEntry[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "POS Health",
    url: "/poshealth",
    icon: Activity,
  },
  { type: "separator" },
  {
    title: "Corporativo",
    url: "#",
    icon: Building,
    items: [
      { title: "Top", url: "/corporativo/top" },
      { title: "Grilla de coprporativos", url: "/corporativo/listado" },
    ],
  },
  {
    title: "Comercios",
    url: "#",
    icon: Store,
    items: [
      { title: "Comercios físicos", url: "#", },
      { title: "Comercios móvil", url: "#", },
      { title: "E-commerce", url: "#", },
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
    icon: Wallet, items: [
      { title: "Conciliaciones", url: "#", },
      { title: "Contracargos", url: "#", },
      { title: "Transacciones a liquidar", url: "#", },
    ],
  },
  { type: "separator" },
  {
    title: "Dispositivos",
    url: "#",
    icon: Smartphone,
    items: [
      { title: "Grilla de dispositivos", url: "#", },
      { title: "Administracion", url: "#", },
    ],
  },
  {
    title: "Catálogo",
    url: "#",
    icon: Container,
    items: [
      { title: "Marcas", url: "#", },
      { title: "Modelos", url: "#", },
      { title: "FiDD", url: "#", },
      { title: "Bines", url: "#", },
    ],
  },
  {
    title: "Versiones",
    url: "#",
    icon: Package,
    items: [
      { title: "Grilla de versiones", url: "#", },
      { title: "Asignar versiones", url: "#", },
      { title: "Gráficas de versiones", url: "#", },
    ],
  },
  { type: "separator" },
  {
    title: "Administracion",
    url: "#",
    icon: Settings,
    items: [
      { title: "Usuarios", url: "#", },
      { title: "Monitoreo", url: "#", },
      { title: "Webhooks", url: "#", },
    ],
  },

];

const AppSidebar = () => {
  const location = useLocation();
  const [userOpenKeys, setUserOpenKeys] = useState<Set<string>>(() => new Set());

  const openKeys = useMemo(() => {
    const next = new Set(userOpenKeys);
    const parentToOpen = navMain.find(
      (entry): entry is NavMainItem =>
        isNavItem(entry) &&
        Boolean(entry.items?.some((sub) => sub.url === location.pathname))
    );
    if (parentToOpen) next.add(parentToOpen.title);
    return next;
  }, [userOpenKeys, location.pathname]);

  const toggleOpen = useCallback((key: string) => {
    setUserOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="font-semibold">
              <LayoutDashboard className="size-5" />
              <span>Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Secciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((entry, index) => {
                if ("type" in entry && entry.type === "separator") {
                  return (
                    <SidebarSeparator
                      key={`separator-${index}`}
                      className="my-2"
                    />
                  );
                }
                const item = entry as NavMainItem;
                if (item.items?.length) {
                  const isParentActive = item.items.some(
                    (sub) => sub.url !== "#" && location.pathname === sub.url
                  );
                  const isOpen = openKeys.has(item.title);
                  return (
                    <SidebarMenuItem key={item.url + item.title}>
                      <SidebarMenuButton
                        isActive={isParentActive && item.url === "#"}
                        tooltip={item.title}
                        onClick={
                          item.url === "#"
                            ? () => toggleOpen(item.title)
                            : undefined
                        }
                        asChild={item.url !== "#"}
                      >
                        {item.url === "#" ? (
                          <>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight
                              className={cn(
                                "ml-auto size-4 transition-transform duration-200",
                                isOpen && "rotate-90"
                              )}
                            />
                          </>
                        ) : (
                          <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                      {isOpen && (
                        <SidebarMenuSub>
                          {item.items.map((sub) => {
                            const isActive = location.pathname === sub.url;
                            return (
                              <SidebarMenuSubItem key={sub.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive || sub.isActive}
                                >
                                  <Link to={sub.url}>{sub.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                }
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url + item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
