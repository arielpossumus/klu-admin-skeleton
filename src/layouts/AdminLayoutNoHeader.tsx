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
                <SidebarInset
                    className="m-0 min-h-0 flex-1 !rounded-none bg-[var(--color-primary-light)] shadow-none md:peer-data-[variant=inset]:!m-0 md:peer-data-[variant=inset]:!ml-0 md:peer-data-[variant=inset]:!rounded-none md:peer-data-[variant=inset]:shadow-none md:peer-data-[variant=inset]:peer-data-[state=collapsed]:!ml-0"
                >
                    <div
                        className="flex shrink-0 items-center gap-2 bg-[var(--color-primary-light)] px-3 py-2 md:px-4"
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
                    <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-[var(--color-primary-light)]">
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default AdminLayoutNoHeader;
