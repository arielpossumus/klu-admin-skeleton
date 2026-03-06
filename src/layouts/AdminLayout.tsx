import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";

const AdminLayout = () => {
  return (
    <div className="min-h-svh p-6 md:p-8">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main
            className="flex flex-1 flex-col overflow-auto p-4 bg-muted/30"
            role="main"
          >
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
