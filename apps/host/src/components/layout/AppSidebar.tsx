import { Link, useLocation } from "react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar from "@/assets/KluAvatarWhite.svg";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navMain, type NavEntry, type NavMainItem } from "@/config/navigation";

const isNavItem = (entry: NavEntry): entry is NavMainItem =>
  "title" in entry && "url" in entry;

const isPathActive = (pathname: string, itemUrl: string): boolean => {
  if (itemUrl === "#") return false;
  if (pathname === itemUrl) return true;
  const prefix = itemUrl.endsWith("/") ? itemUrl : `${itemUrl}/`;
  return pathname.startsWith(prefix);
};

const HOVER_CLOSE_MS = 200;

type SidebarCollapsedSubmenuProps = {
  item: NavMainItem;
  isParentActive: boolean;
  pathname: string;
};

const SidebarCollapsedSubmenu = ({
  item,
  isParentActive,
  pathname,
}: SidebarCollapsedSubmenuProps) => {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current != null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <div className="w-full" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            className="cursor-pointer"
            isActive={isParentActive && item.url === "#"}
            tooltip={undefined}
          >
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight
              className="ml-auto size-4 opacity-0 pointer-events-none"
              aria-hidden
            />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        side="right"
        align="start"
        sideOffset={8}
        className="z-[100] min-w-[12rem]"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        {item.items?.map((sub) => {
          const isActive =
            pathname === sub.url ||
            (sub.url !== "#" && isPathActive(pathname, sub.url));
          return (
            <DropdownMenuItem key={`${sub.url}-${sub.title}`} asChild>
              <Link
                to={sub.url}
                className={cn("cursor-pointer", isActive && "bg-accent font-medium")}
                onClick={() => setOpen(false)}
              >
                {sub.title}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  const { state, isMobile } = useSidebar();
  const [userOpenKeys, setUserOpenKeys] = useState<Set<string>>(() => new Set());

  const openKeys = useMemo(() => {
    const next = new Set(userOpenKeys);
    const parentToOpen = navMain.find(
      (entry): entry is NavMainItem =>
        isNavItem(entry) &&
        Boolean(
          entry.items?.some(
            (sub) =>
              sub.url !== "#" &&
              (location.pathname === sub.url || isPathActive(location.pathname, sub.url))
          )
        )
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
    <Sidebar
      collapsible="icon"
      innerClassName="bg-primary-light"
      className="!border-none"
    >
      <SidebarHeader className="relative z-10 flex h-14 shrink-0 flex-row items-center border-0 bg-transparent shadow-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="font-semibold hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground data-[state=open]:bg-transparent data-[state=open]:text-sidebar-foreground">
              <img src={avatar} alt="Klu" className="size-10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">Momentum</span>
                <p className="text-sm text-primary-foreground">Plan</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-transparent pt-8">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Secciones</SidebarGroupLabel> */}
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
                    (sub) =>
                      sub.url !== "#" &&
                      (location.pathname === sub.url ||
                        isPathActive(location.pathname, sub.url))
                  );
                  const isOpen = openKeys.has(item.title);
                  const showCollapsedFlyout = state === "collapsed" && !isMobile;

                  if (showCollapsedFlyout) {
                    return (
                      <SidebarMenuItem key={item.url + item.title}>
                        <SidebarCollapsedSubmenu
                          item={item}
                          isParentActive={isParentActive}
                          pathname={location.pathname}
                        />
                      </SidebarMenuItem>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.url + item.title}>
                      <SidebarMenuButton
                        className="cursor-pointer"
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
                                "cursor-pointer ml-auto size-4 transition-transform duration-200",
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
                            const isActive =
                              location.pathname === sub.url ||
                              (sub.url !== "#" &&
                                isPathActive(location.pathname, sub.url));
                            return (
                              <SidebarMenuSubItem
                                key={sub.url}
                                className="cursor-pointer"
                              >
                                <SidebarMenuSubButton
                                  className="cursor-pointer"
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
                const isActive =
                  location.pathname === item.url || isPathActive(location.pathname, item.url);
                return (
                  <SidebarMenuItem key={item.url + item.title}>
                    <SidebarMenuButton className="cursor-pointer" asChild isActive={isActive} tooltip={item.title}>
                      <Link className="cursor-pointer" to={item.url}>
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
