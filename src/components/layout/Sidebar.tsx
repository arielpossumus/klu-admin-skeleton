import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
] as const;

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside
      className="flex w-56 flex-col border-r border-border bg-[var(--color-primary)] text-sidebar-foreground"
      aria-label="Navegación principal"
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <span className="font-semibold">Admin</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
