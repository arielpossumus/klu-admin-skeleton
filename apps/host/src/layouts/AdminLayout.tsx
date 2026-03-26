import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";

const AdminLayout = () => {
  return (
    <div className="min-h-svh">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-transparent shadow-none md:peer-data-[variant=inset]:shadow-none">
          <Header />
          <main
            className="flex flex-1 flex-col overflow-auto bg-transparent p-4"
            role="main"
          >
            <div className="flex flex-1 flex-col">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
