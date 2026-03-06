import React from "react";
import { Link, useLocation } from "react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavUser } from "./NavUser";
import { getBreadcrumb } from "@/config/navigation";

const user = {
  name: "Ariel Karlen",
  roleName: "Administrador",
  avatar: "/avatars/shadcn.jpg",
} as const;

const Header = () => {
  const location = useLocation();
  const items = getBreadcrumb(location.pathname);

  return (
    <header
      className="flex h-14 shrink-0 items-center gap-2 bg-background px-4"
      role="banner"
    >
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          {items.length === 0 ? (
            <BreadcrumbItem>
              <BreadcrumbPage>Inicio</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            items.map(({ path, label }, index) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;
              const isLink = !isFirst && !isLast;
              return (
                <React.Fragment key={path}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {isLink ? (
                      <BreadcrumbLink asChild>
                        <Link to={path}>{label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2" aria-label="Acciones">
        <NavUser user={user} />
      </div>
    </header>
  );
};

export default Header;
