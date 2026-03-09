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
import avatar from "@/assets/KluAvatar.svg";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navMain, type NavEntry, type NavMainItem } from "@/config/navigation";

const isNavItem = (entry: NavEntry): entry is NavMainItem =>
  "title" in entry && "url" in entry;

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
              <img src={avatar} alt="Klu" className="size-10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">Momentum</span>
                <p className="text-sm text-muted-foreground">Plan</p>
              </div>
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
