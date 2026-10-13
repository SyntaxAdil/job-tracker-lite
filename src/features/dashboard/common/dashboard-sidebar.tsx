"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient, useSession } from "@/lib/auth/auth-client";
import Logo from "@/components/common/logo";
import { dashboardNavItems } from "@/features/dashboard/data/dashboard";

export default function DashboardSidebar(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data: session, isPending, refetch } = useSession();

  const userClient = session?.user;

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
    refetch();
    router.push("/");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-card transition-all duration-300"
    >
      <SidebarHeader
        className={`h-20 flex flex-row items-center justify-between border-b border-border ${
          isCollapsed ? "justify-center px-0" : "px-4"
        }`}
      >
        {!isCollapsed ? (
          <>
            <Link href="/" className="flex items-center gap-2.5 min-w-0">
              <Logo text={false} />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  Job Tracker
                </span>
                <span className="text-[10px] text-muted-foreground font-medium mt-0.5">
                  Lite v1.0
                </span>
              </div>
            </Link>
            <SidebarTrigger className="size-8 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted" />
          </>
        ) : (
          <div className="group relative size-9 flex items-center justify-center">
            {/* JT Logo background that hides on hover */}
            <div className="absolute inset-0 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm transition-opacity duration-150 group-hover:opacity-0">
              JT
            </div>
            {/* Sidebar Trigger that appears on hover over the JT box */}
            <SidebarTrigger className="absolute inset-0 size-9 rounded-lg bg-primary/15 opacity-0 transition-opacity duration-150 group-hover:opacity-150 text-primary flex items-center justify-center cursor-pointer" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className={`py-4 ${isCollapsed ? "px-2" : "px-3"}`}>
        <SidebarMenu className="gap-1">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  tooltip={item.title}
                  className={`w-full flex items-center h-10 rounded-xl transition-all duration-150 group ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                  } ${isCollapsed ? "justify-center px-0 size-10 mx-auto" : "px-3 gap-3"}`}
                >
                  <item.icon
                    className={`size-4 shrink-0 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="text-xs tracking-wide">{item.title}</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className={`p-3 border-t border-border bg-card ${
          isCollapsed ? "items-center px-1" : "space-y-3"
        }`}
      >
        {isPending ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="animate-spin size-4 text-muted-foreground" />
          </div>
        ) : (
          <>
            {!isCollapsed && (
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-secondary/50 border border-border">
                <div className="relative size-8 rounded-full overflow-hidden border border-border shrink-0 bg-muted">
                  <Image
                    src={
                      userClient?.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    }
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden flex-1">
                  <h3 className="text-xs font-semibold text-foreground truncate leading-tight">
                    {userClient?.name || "Alex Morgan"}
                  </h3>
                  <span className="text-[10px] text-muted-foreground block truncate font-normal mt-0.5">
                    {userClient?.email || "alex.morgan@domain"}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className={`w-full flex items-center justify-center font-medium text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl transition-all ${
                isCollapsed ? "size-10 p-0" : "h-9 gap-2 px-3"
              }`}
            >
              <LogOut className="size-4 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
