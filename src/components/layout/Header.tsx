import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

const user = {
  name: "Ariel Karlen",
  roleName: "Administrador",
  avatar: "/avatars/shadcn.jpg",
} as const;

const Header = () => {
  return (
    <header
      className="flex h-14 shrink-0 items-center gap-2  bg-background px-4"
      role="banner"
    >
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Cabecera</h1>
      <div className="ml-auto flex items-center gap-2" aria-label="Acciones">
        <NavUser user={user} />
      </div>
    </header>
  );
};

export default Header;
