"use client";

import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const active = pathname === item.url || item.isActive;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                  active
                    ? "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                    : "hover:bg-orange-50 hover:text-orange-600 text-gray-700"
                }`}
              >
                <a href={item.url}>
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
