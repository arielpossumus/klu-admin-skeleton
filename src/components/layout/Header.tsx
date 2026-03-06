import { SidebarTrigger } from "@/components/ui/sidebar"

const Header = () => {
  return (
    <header
      className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4"
      role="banner"
    >
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Cabecera</h1>
      <div className="ml-auto flex items-center gap-2" aria-label="Acciones">
        {/* Espacio para notificaciones, usuario, etc. */}
      </div>
    </header>
  )
}

export default Header
