import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Helmet from "@/components/helmet";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadcrumbBar from "@/components/bread-crumb";

export default function LayoutDashboard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <Helmet title="Dashboard" />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <BreadcrumbBar />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
