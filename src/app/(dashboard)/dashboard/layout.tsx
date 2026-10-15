import { SidebarProvider } from "../../../components/ui/sidebar";
import { TooltipProvider } from "../../../components/ui/tooltip";
import DashboardSidebar from "../../../features/dashboard/common/dashboard-sidebar";
import QueryProvider from "../../../providers/query-provider";
// import DashboardHeader from "../../components/dashboard/dashboard-header";
// import DashboardSidebar from "../../components/dashboard/dashboard-slider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen">
      <QueryProvider>
        <TooltipProvider>
          <SidebarProvider>
            <DashboardSidebar />

            <main className=" w-full p-4">
              {/* <DashboardHeader /> */}
              <section>{children}</section>
            </main>
          </SidebarProvider>
        </TooltipProvider>
      </QueryProvider>
    </section>
  );
}
