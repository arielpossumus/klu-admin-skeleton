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
        <SidebarInset>
          <Header />
          <main
            className="flex flex-1 flex-col overflow-auto bg-[var(--color-primary-light)]  p-4"
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
