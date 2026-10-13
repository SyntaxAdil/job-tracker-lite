import { LayoutDashboard, Briefcase, FileText, Settings } from "lucide-react";

export interface NavItem {
  title: string;
  icon: typeof LayoutDashboard;
  href: string;
}

export const dashboardNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Workspaces", icon: Briefcase, href: "/dashboard/workspaces" },
  { title: "Applications", icon: FileText, href: "/dashboard/applications" },
  // { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];
