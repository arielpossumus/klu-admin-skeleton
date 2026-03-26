import { Outlet } from "react-router";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";


const AdminLayoutNoHeader = () => {
    return (
        <div className="min-h-svh">
            <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <SidebarInset className="bg-transparent shadow-none md:peer-data-[variant=inset]:shadow-none">
                    <div
                        className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-white/10 bg-primary/25 px-4 text-white backdrop-blur-md"

                        role="toolbar"
                        aria-label="Acciones del panel principal"
                    >
                        <SidebarTrigger
                            type="button"
                            variant="ghost"
                            className="size-9 text-white hover:bg-white/10 hover:text-white"
                            aria-label="Expandir o contraer menú lateral"
                        />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-transparent">
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default AdminLayoutNoHeader;
