"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useLocation } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const location = useLocation();

  // Verifica se o item está ativo baseado na URL atual
  const isItemActive = (url: string) => {
    return location.pathname.startsWith(url);
  };

  return (
    <SidebarGroup className="py-4">
      <SidebarGroupLabel className="px-4 text-sm font-medium text-gray-500">
        Menu Principal
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isItemActive(item.url) || item.isActive}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 
                  ${isItemActive(item.url) ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
              >
                <a href={item.url} className="flex items-center w-full">
                  <item.icon
                    className={`h-5 w-5 ${isItemActive(item.url) ? "text-blue-600" : "text-gray-500"}`}
                  />
                  <span className="ml-3 text-sm font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>

              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="px-2 hover:bg-gray-100 rounded-md data-[state=open]:rotate-90 transition-transform">
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Expandir menu</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors
                              ${
                                isItemActive(subItem.url)
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                          >
                            <a
                              href={subItem.url}
                              className="flex items-center w-full"
                            >
                              {subItem.icon && (
                                <subItem.icon
                                  className={`mr-3 h-4 w-4 
                                    ${isItemActive(subItem.url) ? "text-blue-600" : "text-gray-500"}`}
                                />
                              )}
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
