import { SidebarProvider } from "../../../components/ui/sidebar";
import { TooltipProvider } from "../../../components/ui/tooltip";
import DashboardSidebar from "../../../features/dashboard/common/dashboard-sidebar";
// import DashboardHeader from "../../components/dashboard/dashboard-header";
// import DashboardSidebar from "../../components/dashboard/dashboard-slider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen">
      <TooltipProvider>
        <SidebarProvider>
          <DashboardSidebar />

          <main className=" w-full p-4">
            {/* <DashboardHeader /> */}
            <section>{children}</section>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </section>
  );
}
